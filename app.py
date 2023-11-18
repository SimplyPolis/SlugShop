from async_oauthlib import OAuth2Session

from quart import Quart, request, redirect, session, url_for, render_template_string, render_template, send_file, g, \
    flash
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
            print(request_reponse)
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
    return await render_template("index.html")


@app.route("/listings")
@login_required
async def listings():
    listings = await g.connection.fetch_all(
        "SELECT listing_id,user_id,creation_date,listing_name,listing_description FROM listings WHERE sold = FALSE ORDER BY creation_date;")
    urls={listing[0]:f"{app_url}/listing/{listing[1]}" for listing in listings}
    return await render_template("listings.html",listings=listings,urls=urls)


@app.route("/createlisting")
@login_required
async def createListingpage():
    return await render_template("createlisting.html")


@app.route("/createlistingmethod", methods=["POST"])
@login_required
async def createlisting():
    req_dict = await request.form
    try:
        files = (await asyncio.gather(request.files, return_exceptions=True))[0]
    except:
        print("ooops")
    listing_id=uuid.uuid4().hex
    await g.connection.execute("""INSERT INTO listings (user_id, listing_id,creation_date,listing_name,listing_description)
                VALUES
                    (:user_id, :listing_id,NOW(),:listing_name,:listing_description);""",
                               {"user_id": current_user.auth_id,"listing_id":listing_id,"listing_name":req_dict["lname"],"listing_description":req_dict["ltext"]})
    for index, image_file in enumerate(files.getlist("limage")):
        try:
            filename = await uploaded_photos.save(image_file, folder=listing_id, name=f"{index}.")
        except UploadNotAllowed:
            print("ooops")

    return redirect("/listings")


@app.route("/listing/<listing_id>")
@login_required
async def listinf(listing_id):
    images=[]
    try:
        images=os.listdir(f"listingpics/{listing_id}")
    except:
        images=[]
    user_id,creation_date,listing_name,listing_description=await g.connection.fetch_one("SELECT user_id,creation_date,listing_name,listing_description FROM listings WHERE listing_id LIKE listing_id;",{"listing_id":listing_id})
    return await render_template("listing.html", title=listing_name,text=listing_description,
                                 images=images)


@app.route("/listingpics/<listing_id>/<image_name>", methods=["GET"])
@login_required
async def getimage(listing_id, image_name):
    return await send_file(f"listingpics/{listing_id}/{image_name}", mimetype="image/*")


@app.route("/createdb")
@login_required
async def createdb():
    await g.connection.execute(
        """CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR (32) PRIMARY KEY UNIQUE,
        name VARCHAR ( 50 ) UNIQUE NOT NULL,
        profile VARCHAR ( 255 ),
        email VARCHAR ( 255 ) UNIQUE NOT NULL
        );""")

    await g.connection.execute("""CREATE TABLE IF NOT EXISTS listings (
user_id VARCHAR (32) NOT NULL UNIQUE,
listing_id VARCHAR (32) NOT NULL UNIQUE,
creation_date TIMESTAMP NOT NULL,
listing_name TEXT NOT NULL,
listing_description TEXT NOT NULL,
sold BOOL NOT NULL DEFAULT FALSE,
PRIMARY KEY (user_id, listing_id),
FOREIGN KEY (user_id)
  REFERENCES users (user_id)
);""")
    return redirect("/")


@app.route("/deletedb")
@login_required
async def deletedb():
    await g.connection.execute("""DROP TABLE IF EXISTS users CASCADE;""")
    await g.connection.execute("""DROP TABLE IF EXISTS listings;""")
    return redirect("/")


@app.errorhandler(Unauthorized)
async def redirect_to_login(*_):
    return redirect(url_for("login"))


app.run(host="localhost", port=5000, certfile="localhost.pem", keyfile="localhost-key.pem")
