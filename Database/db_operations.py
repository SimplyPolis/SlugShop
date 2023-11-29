# db_operations.py
import aiomysql
import asyncio

async def fetch_users():
    connection = await aiomysql.connect(host='localhost', user='root', password='Slugshop', db='SlugShopDB')
    async with connection.cursor() as cursor:
        await cursor.execute('SELECT * FROM users')
        result = await cursor.fetchall()
    connection.close()
    return result