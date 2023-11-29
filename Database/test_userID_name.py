import pytest
import asyncio
import aiomysql
from asyncFunc import create_connection_pool, userID_name

@pytest.fixture
async def test_connection_pool():
    pool = await create_connection_pool()
    yield pool
    pool.close()
    await pool.wait_closed()

@pytest.mark.asyncio
async def test_userID_name(test_connection_pool):
    # Test data
    user_id = 1
    name = "Greg"
    email = "glyubars@ucsc.edu"

    # Perform the asynchronous operation
    await userID_name(test_connection_pool, user_id, name, email)

    # Verify the result by querying the database
    async with (test_connection_pool.acquire()) as conn:
        async with conn.cursor() as cursor:
            # Fetch user information from the database
            select_query = """
            SELECT * FROM users WHERE userid = %s
            """
            await cursor.execute(select_query, (user_id,))
            result = await cursor.fetchone()

    # Assert that the user information is as expected
    assert result is not None
    assert result[0] == user_id
    assert result[1] == name
    assert result[2] == email
    assert result[3] == '0'
