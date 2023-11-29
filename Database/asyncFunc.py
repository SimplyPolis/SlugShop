import asyncio
import aiomysql

async def create_connection_pool():
    pool = await aiomysql.create_pool(
        host="localhost",
        user="root",
        password="Slugshop",
        db="SlugShopDB",
        minsize=5,
        maxsize=10
    )
    return pool

async def userID_name(connection_pool, userid, name, email):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            INSERT INTO users (name, userid, email, rating)
            VALUES (%s, %s, %s, %s)
            """
            values = (name, userid, email, '0')
            await cursor.execute(insert_query, values)

async def getRating(connection_pool, userid):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            select_query = """
            SELECT rating FROM users
            WHERE userid = %s
            """
            await cursor.execute(select_query, (userid,))
            rating = await cursor.fetchone()
            return rating[0] if rating else None

async def createListing(connection_pool, listingid, price, userid, image, name, Desc, category):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            INSERT INTO listings (listingID , name, price, image, Description, active, category, userid, soldToUser)
            VALUES (%s, %s, %s, %s, %s, %b, %s, %s, %s)
            """
            values = (listingid, name, price, image, Desc, True, category, userid, '0')
            await cursor.execute(insert_query, values)

async def updateActive(connection_pool, listingid, active):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            UPDATE active FROM listngs
            SET active = %b
            WHERE listingid = %s
            """
            values = (active, listingid)
            await cursor.execute(insert_query, values)

async def updateSoldTo(connection_pool, listingid, userID):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            UPDATE active FROM listngs
            SET soldToUser = %s
            WHERE listingid = %s
            """
            values = (userID, listingid)
            await cursor.execute(insert_query, values)

async def updateDescription(connection_pool, listingid, desc):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            UPDATE active FROM listngs
            SET Description = %s
            WHERE listingid = %s
            """
            values = (desc, listingid)
            await cursor.execute(insert_query, values)

async def updatePrice(connection_pool, listingid, price):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            UPDATE active FROM listngs
            SET price = %b
            WHERE listingid = %s
            """
            values = (price, listingid)
            await cursor.execute(insert_query, values)

async def updateImage(connection_pool, listingid, img):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            UPDATE active FROM listngs
            SET image = %s
            WHERE listingid = %s
            """
            values = (img, listingid)
            await cursor.execute(insert_query, values)

async def selectFromUser(connection_pool, colName, userId):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            SELECT %s FROM users 
            WHERE userID = %s
            """
            values = (colName, userId)
            await cursor.execute(insert_query, values)

async def selectFromListing(connection_pool, colName, listingId):
    async with connection_pool.acquire() as conn:
        async with conn.cursor() as cursor:
            insert_query = """
            SELECT %s FROM listings 
            WHERE listingid = %s
            """
            values = (colName, listingId)
            await cursor.execute(insert_query, values)
async def main():
    global connection_pool  # Make connection_pool a global variable
    connection_pool = await create_connection_pool()
    
    try:
        await userID_name(connection_pool, 1, "Greg", "glyubars@ucsc.edu")

    finally:
        connection_pool.close()
        await connection_pool.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
