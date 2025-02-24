import React, { useState, useEffect } from "react";
import "../Profile/Profile.css"; // Add necessary styles
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({
    name: " ",
    email: " ",
    profilePic: "",
  });

  const [orders, setOrders] = useState([
    { id: "12345", date: "Feb 1, 2025", total: "$120.00", status: "Delivered" },
    { id: "67890", date: "Jan 28, 2025", total: "$75.50", status: "Shipped" },
  ]);

  // Fetch user details from backend/local storage (mocking for now)
  useEffect(() => {
    // Simulate fetching user data
    const storedUser = JSON.parse(localStorage.getItem("user")) || user;
    setUser(storedUser);
  }, []);
  const username = localStorage.getItem('username')
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear stored user data
    localStorage.removeItem("products"); // Clear cart data
    localStorage.removeItem('username')
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {user.profilePic ? (
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
        ) : (
          <FaUserCircle className="default-profile-pic" />
        )}
        <h2>{username}</h2>
        <p>{user.email}</p>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="orders-section">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <span>Order #{order.id}</span> - <span>{order.date}</span> - <span>{order.total}</span> - <strong>{order.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="settings-section">
        <h3>Account Settings</h3>
        <Link to="/update-profile">
          <button className="update-profile-btn">Edit Profile</button>
        </Link>
        <Link to="/change-password">
          <button className="change-password-btn">Change Password</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
