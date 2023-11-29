import mysql.connector

# Replace with your MySQL server details
host = "localhost"
user = "root"
password = "Slugshop"

# Connect to MySQL as the root user (or a user with appropriate privileges)
try:
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )
except mysql.connector.Error as err:
    print(f"Error: {err}")
    exit(1)

# Create a cursor to execute SQL commands
cursor = conn.cursor()

# Replace 'your_database_name' with the desired database name
database_name = 'SlugShopDB'

# Create the database if it doesn't exist
try:
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")
    print(f"Database '{database_name}' created successfully.")
except mysql.connector.Error as err:
    print(f"Error: {err}")

# Close the cursor and MySQL connection
cursor.close()
conn.close()
