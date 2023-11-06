from async_oauthlib import OAuth2Session

from quart import Quart, request, redirect, session, url_for, render_template_string,render_template
from quart.json import jsonify
from quart_auth import AuthUser, current_user, login_required, login_user, logout_user, QuartAuth, Unauthorized
import os
import secrets
listing_id=0
CLIENT_ID = os.environ['CLIENT_ID']
CLIENT_SECRET = os.environ['CLIENT_SECRET']
authorization_base_url = 'https://accounts.google.com/o/oauth2/auth'
token_url = "https://accounts.google.com/o/oauth2/token"
get_user_info ='https://www.googleapis.com/userinfo/v2/me?alt=json&access_token={}'
app_url="https://localhost:5000"
class Listing():
    def __init__(self,title,text):
        global listing_id
        self.title=title
        self.text=text
        self.id=listing_id
        listing_id+=1
    @property
    def url(self):
        return f"{app_url}/listing/{self.id}"
totsadb=dict()
all_listing=[Listing("Listing 1","Listing 1 test"),Listing("Listing 2","Listing 2 test")]
class User(AuthUser):
    def __init__(self, auth_id):
        super().__init__(auth_id)
        self._resolved = False
        self._email = None
        self._name= None

    async def _resolve(self):
        if self._resolved:
            return
        user_dict=totsadb.get(self.auth_id)
        self._email = user_dict["email"]
        self._name=user_dict["name"]
        self._resolved = True

    @property
    async def email(self):
        await self._resolve()
        return self._email

    @property
    async def name(self):
        await self._resolve()
        return self._name



app = Quart(__name__)
app.secret_key = secrets.token_urlsafe(16)
auth_manager = QuartAuth(app)
auth_manager.user_class = User
# This information is obtained upon registration of a new GitHub


@app.route("/login")
async def login():
   async with OAuth2Session(CLIENT_ID,scope=["https://www.googleapis.com/auth/userinfo.profile","openid","https://www.googleapis.com/auth/userinfo.email"],redirect_uri=f"{app_url}/redirect") as google:
        authorization_url, state = google.authorization_url(authorization_base_url, access_type="offline", prompt="select_account")
        # State is used to prevent CSRF, keep this for later.
        session['oauth_state'] = state
        return redirect(authorization_url)


@app.route("/redirect")

async def redirect_page():
   async with OAuth2Session(CLIENT_ID, state=session['oauth_state'],scope=["https://www.googleapis.com/auth/userinfo.profile","openid","https://www.googleapis.com/auth/userinfo.email"],redirect_uri=f"{app_url}/redirect") as google:
        token = await google.fetch_token(token_url, client_secret=CLIENT_SECRET, authorization_response=request.url)
        request_url=get_user_info.format(token["access_token"])
        request_reponse=await google.get(request_url)
        if request_reponse.ok:
            request_reponse=await request_reponse.json()
            if not request_reponse["id"] in totsadb:
                totsadb.update({request_reponse["id"]:{"email":request_reponse["email"],"name":request_reponse["name"]}})
            login_user(User(request_reponse["id"]))
        return redirect("/")

@app.route("/")
@login_required
async def home():
    return await render_template("index.html")

@app.route("/listings")
@login_required
async def listings():
    return await render_template("listings.html",listings=all_listing)

@app.route("/listing/<listing_id>")
async def listinf(listing_id):
    return await render_template("listing.html", listing=all_listing[int(listing_id)])
@app.errorhandler(Unauthorized)
async def redirect_to_login(*_):
    return redirect(url_for("login"))

app.run(host="localhost",port=5000,certfile=".\localhost.pem",keyfile=".\localhost-key.pem")