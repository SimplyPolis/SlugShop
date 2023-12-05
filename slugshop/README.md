# Instructions for front-end: 

# Install:

-In order to test the react code there have to be a few npm packages installed.

    1. npm install 
        * This installs npm into your machine, allowing you to install other npm packages.
    2. npm install -D tailwindcss
        * This adds the tailwindcss package into your machine, allowing for easy styling of different webpage elements.
    3. npx tailwindcss init
        * This initalizes the tailwind package, creating a config file and allowing for tailwindcss to actually be utilized.
    4. npm install @mui/material @emotion/react @emotion/styled
        * This install the Material UI package into you machine, allowing for simple creating of different webpage elements.
    
-To run the localhost React server for testing, run:
    * npm start

# Understanding the Front-End

- The front end is composed of multiple pages:
    1. Login Page 
        * This uses Google Authenticator in order restrict access to those that are not affiliated (have a @ucsc.edu email) with UCSC.
    2. Home Page
        * This is a page that displays the different listings based on the most recent.
    3. Account Page
        * This is a page that displays the individual user's account information.
    4. Create Listing Page
        * This is a page that allows the user to create a listing
        * User inputs the listing name, price, size, and condition.
    5. Individual Listing Page
        * This page displays the individual listing that is made by a specific user.
