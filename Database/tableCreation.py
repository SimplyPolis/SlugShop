import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Slugshop",
    database="SlugShopDB"
)

cursor = conn.cursor()

create_users_table = """
CREATE TABLE users (
    userid INT,
    name VARCHAR(255),
    email VARCHAR(255),
    rating INT
)
"""

create_listings_table = """
CREATE TABLE listings (
    listingID INT,
    name VARCHAR(255),
    price VARCHAR(255),
    image VARCHAR(255),
    Description VARCHAR(255),
    active BOOLEAN,
    category VARCHAR(255),
    userid INT,
    soldToUser INT,
)
"""



try:
    cursor.execute(create_users_table)
    print(f"Table users created successfully.")
except mysql.connector.Error as err:
    print(f"Error: {err}")

try:
    cursor.execute(create_listings_table)
    print(f"Table listings created successfully.")
except mysql.connector.Error as err:
    print(f"Error: {err}")




cursor.close()
conn.close()