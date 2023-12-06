/*
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Updated CSS file name

const Profile = () => {
  // Assuming you will fetch this data from an API or authentication service
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150' // Placeholder image URL
  });

  // You can replace this useEffect with a real API call to fetch user data
  useEffect(() => {
    // Fetch user data from API
    // This is a placeholder for where you would make an API call
    // setUserData(fetchedUserData);
  }, []);

  return (
    <div className='profile'>
      <div className="profile-header">
        <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
      </div>
    </div>
  );
}

export default Profile;
*/

/*
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Ensure this CSS file exists for styling

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    profile: '',
    user_id: ''
  });

  useEffect(() => {
    // Fetch the user data from the JSON file
    fetch('/getuserinfo.json') // Adjust the path if necessary
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className='profile'>
      <div className="profile-header">
        <img src={userData.profile} alt="Profile" className="profile-picture" />
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
      </div>
    </div>
  );
}

export default Profile;

*/
import React, { useState, useEffect } from 'react';
import './Profile.css';
import Item from '../Item/Item'; // Assuming Item is the component to display each listing

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    profile: '',
    user_id: ''
  });
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetch('/getuserinfo.json') // Adjust path as needed
      .then(response => response.json())
      .then(data => {
        setUserData(data);

        // Fetch user's listings
        return fetch(`/getlisting?user_id=${data.user_id}`); // Use user_id to fetch listings
      })
      .then(response => response.json())
      .then(listingData => {
        setListings(listingData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className='profile'>
      <div className="profile-header">
        <img src={userData.profile} alt="Profile" className="profile-picture" />
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
      </div>
      <div className="user-listings">
        {listings.map((item, i) => (
          <Item 
            key={i} 
            id={item.listing_id} 
            name={item.listing_name} 
            image={item.images[0]} // Assuming you want to display the first image
            price={item.price} // Assuming 'price' is the new price
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;

