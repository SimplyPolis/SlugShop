@app.route("/updatelisting/<listing_id>", methods=["GET", "POST"])
@login_required
async def updatelisting(listing_id):
    if request.method == 'POST':
        req_dict = await request.form
        await g.connection.execute("""
            UPDATE listings
            SET listing_name = :listing_name,
                listing_description = :listing_description,
                category = :category,
                price = :price
            WHERE listing_id = :listing_id;
        """, {
            "listing_id": listing_id,
            "listing_name": req_dict["name"],
            "listing_description": req_dict["text"],
            "category": req_dict["categories"],
            "price": int(req_dict["price"])
        })
        return redirect("/listings")
    else:
        listing = await g.connection.fetch_one("""
            SELECT * FROM listings WHERE listing_id = :listing_id;
        """, {"listing_id": listing_id})

        return await render_template("updatelisting.html", listing=listing)

@app.route("/markassold/<listing_id>")
@login_required
async def markassold(listing_id):
    await g.connection.execute("""
        UPDATE listings
        SET sold = TRUE
        WHERE listing_id = :listing_id;
    """, {"listing_id": listing_id})

    return redirect("/listings")


@app.route("/updateuser")
@login_required
async def updateuser():
    return await render_template("updateuser.html")  # Render a form to update user information

@app.route("/do_updateuser", methods=["POST"])
@login_required
async def do_updateuser():
    req_dict = await request.form
    # Add code to update user information in the database using the provided req_dict
    await g.connection.execute("""
        UPDATE users
        SET name = :name,
            profile = :profile
        WHERE user_id = :user_id;
    """, {
        "user_id": current_user.auth_id,
        "name": req_dict["name"],
        "profile": req_dict["profile"]
    })
    return redirect("/")
