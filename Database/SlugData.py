import asyncio
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
# Initialize Firebase using your service account credentials
cred = credentials.Certificate('/Users/gregorylyubarskiy/Desktop/SlugShopDB/slugshop-1ac3b-firebase-adminsdk-swiwd-5916d2737b.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://slugshop-1ac3b-default-rtdb.firebaseio.com/'
})
users_ref = db.reference('users')
listing_ref = db.reference('listings')
async def addUser(name, userid, email):
    new_child_data = {
        'name': name,
        'email': email,
        'id' : userid,
        'itemsBought': '',
        'rating': '',
        'tis': '',

    }
        # Add the data to the new child
    new_child_ref = users_ref.child(userid)

    # Set the data for the new child
    await asyncio.to_thread(new_child_ref.set(new_child_data))

async def deleteUser(userid):
    await users_ref.child(userid).set({})

async def addListing(listingid, name, desc, userid, category):
    new_child_data = {
        'name': name,
        'userid' : userid,
        'listingid': listingid,
        'category': category,
        'desc': desc,
        'soldto': '',
        'active': 'Yes',
        'keywords': '', 


    }
        # Add the data to the new child
    new_child_ref = users_ref.child(userid)

    # Set the data for the new child
    await new_child_ref.set(new_child_data)

async def main():
    await addUser("John Doe", "4", "johndoe@example.com")
    await addListing(1, "Airplane", "Boeing 747 replica", "4", "toys")

if __name__ == '__main__':
    asyncio.run(main())


firebase_admin.delete_app(firebase_admin.get_app())


