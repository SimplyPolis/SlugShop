import pytest
import asyncio
from db_operations import fetch_users

@pytest.mark.asyncio
async def test_fetch_users():
    users = await fetch_users()
    assert len(users) > 0

    print("\nUsers:")
    print("{:<5} {:<15} {:<5}".format("ID", "Name", "Email"))
    print("-" * 30)
    for user in users:
        print("{:<5} {:<15} {:<5}".format(user[0], user[1], user[2]))
