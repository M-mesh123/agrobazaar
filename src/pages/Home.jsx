import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "./customer.jpg";
import logo2 from "./farmer.jpg";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState(null); // "farmer" or "customer"

  const openPopup = (type) => {
    setUserType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setUserType(null);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>Welcome to AgroBazaar</h1>
          <p>Buy and Sell Fresh Crops Directly From Farmers</p>


          {/* Role Selection */}
          <div className="role-selection">
            {/* Farmer */}
            <div
              className="role-card"
              onClick={() => openPopup("farmer")}
              style={{ cursor: "pointer" }}
            >
              <img src={logo2} alt="Farmer" className="role-image" />
              <h3>Farmer</h3>
            </div>

            {/* Customer */}
            <div
              className="role-card"
              onClick={() => openPopup("customer")}
              style={{ cursor: "pointer" }}
            >
              <img src={logo1} alt="Customer" className="role-image" />
              <h3>Customer</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Box */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              ✕
            </button>

            <h2 className="popup-title">Welcome to AgroBazaar</h2>
            <p className="popup-subtitle">Please choose an option below:</p>

            <div className="popup-buttons">
              {userType === "customer" && (
                <>
                  <Link
                    to="/Custlogin"
                    state={{ role: "customer" }}
                    className="popup-btn login"
                    onClick={closePopup}
                  >
                    customer Login
                  </Link>
                  <Link
                    to="/Custsignup"
                    className="popup-btn signup"
                    onClick={closePopup}
                  >
                    customer Signup
                  </Link>
                </>
              )}

              {userType === "farmer" && (
                <>
                  <Link
                    to="/Login"
                    className="popup-btn login"
                    onClick={closePopup}
                  >
                    farmer Login
                  </Link>
                  <Link
                    to="/Signup"

                    className="popup-btn signup"
                    onClick={closePopup}
                  >
                    farmer Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

     </div>
  );
}
