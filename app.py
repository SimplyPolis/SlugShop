from async_oauthlib import OAuth2Session

from quart import Quart, request, redirect, session, url_for, render_template_string, render_template, send_file, g
from quart.json import jsonify
from quart_auth import AuthUser, current_user, login_required, login_user, logout_user, QuartAuth, Unauthorized
from quart_uploads import UploadSet, configure_uploads, IMAGES, UploadNotAllowed
from quart_db import QuartDB
import os
import secrets
import uuid
import asyncio

CLIENT_ID = os.environ['CLIENT_ID']
CLIENT_SECRET = os.environ['CLIENT_SECRET']
authorization_base_url = 'https://accounts.google.com/o/oauth2/auth'
token_url = "https://accounts.google.com/o/oauth2/token"
get_user_info = 'https://www.googleapis.com/userinfo/v2/me?alt=json&access_token={}'
app_url = "https://localhost:5000"

app = Quart(__name__)
app.secret_key = secrets.token_urlsafe(16)

db = QuartDB(app, url=f"postgresql://postgres:{os.environ["DATABASE_PASSWORD"]}@localhost:5432/slugshop")

app.config["UPLOADED_PHOTOS_DEST"] = 'listingpics'
uploaded_photos = UploadSet('photos', IMAGES)

configure_uploads(app, uploaded_photos)
auth_manager = QuartAuth(app)


@app.route("/login")
async def login():
    async with OAuth2Session(CLIENT_ID, scope=["https://www.googleapis.com/auth/userinfo.profile", "openid",
                                               "https://www.googleapis.com/auth/userinfo.email"],
                             redirect_uri=f"{app_url}/redirect") as google:
        authorization_url, state = google.authorization_url(authorization_base_url, access_type="offline",
                                                            prompt="select_account")
        # State is used to prevent CSRF, keep this for later.
        session['oauth_state'] = state
        return redirect(authorization_url)


@app.route("/redirect")
async def redirect_page():
    async with OAuth2Session(CLIENT_ID, state=session['oauth_state'],
                             scope=["https://www.googleapis.com/auth/userinfo.profile", "openid",
                                    "https://www.googleapis.com/auth/userinfo.email"],
                             redirect_uri=f"{app_url}/redirect") as google:
        token = await google.fetch_token(token_url, client_secret=CLIENT_SECRET, authorization_response=request.url)
        request_url = get_user_info.format(token["access_token"])
        request_reponse = await google.get(request_url)
        if request_reponse.ok:
            request_reponse = await request_reponse.json()
            await g.connection.execute("""INSERT INTO users (user_id, email,name,profile)
            VALUES
                (:id, :email, :name, :profile)
            ON CONFLICT (user_id) DO UPDATE
            SET (name,profile) = (EXCLUDED.name,EXCLUDED.profile);""",
                                       {"id": request_reponse["id"], "email": request_reponse["email"],
                                        "name": request_reponse["name"], "profile": request_reponse.get("picture", "")})
            login_user(AuthUser(request_reponse["id"]))
        return redirect("/")


@app.route("/")
@login_required
async def home():
    return await render_template("home.html")


@app.route("/listings")
@login_required
async def listings():
    return await render_template("listings.html")


@app.route("/getlistings", methods=["GET"])
@login_required
async def getListings():
    req_dict = request.args
    try:
        listings =(await asyncio.gather(g.connection.fetch_all(
        f"SELECT * FROM listings WHERE {"query @@ websearch_to_tsquery('english',:query) and" if req_dict.get("query") else ""} {"user_id = :user_id and" if req_dict.get("user_id") else ""} {"listing_id = :listing_id and" if req_dict.get("listing_id") else ""} {"category = :category and" if req_dict.get("category") else ""} sold = :sold_status ORDER BY {"TS_RANK(query,websearch_to_tsquery('english',:query)) DESC,"if req_dict.get("query") else ""} :sort LIMIT :limit OFFSET :offset;",
        {"sold_status": req_dict.get("sold", False), "sort": req_dict.get("sort", "creation_date"),
         "limit": req_dict.get("limit", 50), "offset": req_dict.get("offset", 0), "query": req_dict.get("query"),"user_id":req_dict.get("user_id"),"category":req_dict.get("category"),"listing_id":req_dict.get("listing_id")}), return_exceptions=True))[0]
    except:
        listings=[]
    if type(listings) != list:
        listings=[]
    return jsonify([dict(listing) for listing in listings ])




@app.route("/getcategories", methods=["GET"])
@login_required
async def getcategories():
    categories=await g.connection.fetch_one(
        "SELECT ENUM_RANGE(NULL::categories)")

    return jsonify([ {"category":category} for category in categories["enum_range"]])


@app.route("/createlisting", methods=["GET","POST"])
@login_required
async def createlisting():

    if request.method == 'POST':
        req_dict = await request.form
        try:
            files = (await asyncio.gather(request.files, return_exceptions=True))[0]
        except:
            print("ooops")
        listing_id = uuid.uuid4().hex


        image_names=[]
        for index, image_file in enumerate(files.getlist("images")):
            try:
                filename = await uploaded_photos.save(image_file, folder=listing_id, name=f"{index}.")
                image_names.append(filename)
            except UploadNotAllowed:
                print("ooops")
        await g.connection.execute("""INSERT INTO listings (user_id, listing_id,creation_date,listing_name,listing_description,category,price,images)
                                VALUES
                                    (:user_id, :listing_id,NOW(),:listing_name,:listing_description,:category,:price,:images);""",
                                       {"user_id": current_user.auth_id, "listing_id": listing_id,
                                        "listing_name": req_dict["name"], "listing_description": req_dict["text"],
                                        "category": req_dict["categories"], "price": int(req_dict["price"]),"images":image_names})
        return redirect("/listings")
    else:
        return await render_template("createlisting.html")



@app.route("/listing/<listing_id>")
@login_required
async def listing(listing_id):
    images = []
    try:
        images = os.listdir(f"listingpics/{listing_id}")
    except:
        images = []
    user_id, creation_date, listing_name, listing_description = await g.connection.fetch_one(
        "SELECT user_id,creation_date,listing_name,listing_description FROM listings WHERE listing_id = :listing_id;",
        {"listing_id": listing_id})
    return await render_template("listing.html", title=listing_name, text=listing_description,
                                 images=images, id=listing_id)


@app.route("/listingpics/<path:path>", methods=["GET"])
@login_required
async def getImage(path):
    return await send_file(f"listingpics/{path}", mimetype="image/*")

@app.route("/getuserinfo")
@login_required
async def getUserInfo():
    user = await g.connection.fetch_one(
        "SELECT * FROM users WHERE user_id = :user_id;",
        {"user_id": current_user.auth_id})
    return jsonify(dict(user))

@app.route("/deletelisting/<listing_id>")
@login_required
async def deleteListing(listing_id):

    user = await g.connection.fetch_one(
        "SELECT user_id FROM listings WHERE listing_id = :listing_id;",
        {"listing_id": listing_id})

    if user.get("user_id")!=current_user.auth_id:
        print("Here")
        raise Unauthorized()
    await g.connection.execute("""DELETE FROM listings WHERE listing_id = :listing_id""",{"listing_id":listing_id})

    return redirect("/listings")


@app.route("/createdb")
async def createDB():
    await g.connection.execute(
        """CREATE TYPE categories as ENUM (
        'test1',
        'test2'
        );""")
    await g.connection.execute(
        """CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR (32) PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR ( 50 ) UNIQUE NOT NULL,
        profile VARCHAR ( 255 ),
        email VARCHAR ( 255 ) UNIQUE NOT NULL
        );""")

    await g.connection.execute("""CREATE TABLE IF NOT EXISTS listings (
user_id VARCHAR (32) NOT NULL,
listing_id VARCHAR (32) PRIMARY KEY NOT NULL UNIQUE,
creation_date TIMESTAMP NOT NULL,
listing_name TEXT NOT NULL,
listing_description TEXT NOT NULL,
sold BOOL NOT NULL DEFAULT FALSE,
price INT NOT NULL DEFAULT 0,
category categories NOT NULL,
images text[],
query TSVECTOR GENERATED ALWAYS AS (setweight(to_tsvector('english',coalesce(listing_name,'')),'A') ||setweight(to_tsvector('english',coalesce(listing_description,'')),'B')) STORED,


FOREIGN KEY (user_id)
  REFERENCES users (user_id)
);""")
    await g.connection.execute("""CREATE INDEX IF NOT EXISTS query_idx ON listings USING GIN(query)""")
    return redirect("/")


@app.route("/deletedb")
@login_required
async def deletedb():
    await g.connection.execute("""DROP TABLE IF EXISTS users CASCADE;""")
    await g.connection.execute("""DROP TABLE IF EXISTS listings;""")
    await g.connection.execute("""DROP TYPE IF EXISTS categories;""")
    await g.connection.execute("""DROP INDEX IF EXISTS query_idx CASCADE;""")
    return redirect("/")




@app.errorhandler(Unauthorized)
async def redirect_to_login(*_):
    return redirect(url_for("login"))


app.run(host="localhost", port=5000, certfile="localhost.pem", keyfile="localhost-key.pem")
