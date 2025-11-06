import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> support@agrobazaar.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> Agro Street, Nagpur, Maharashtra</p>
        </div>

        {/* About Us */}
        <div className="footer-section">
          <h3>
            <Link to="/About" style={{ textDecoration: "none", color: "inherit" }}>
              About Us
            </Link>
          </h3>
        </div>

        {/* Pesticide Info + Help */}
        <div className="footer-section">
          <h3>
            <Link to="/pesticideinfo" style={{ textDecoration: "none", color: "inherit" }}>
              Pesticide Information
            </Link>
          </h3>
          <div className="footer-help" aria-label="Footer navigation">
            <Link to="/help" className="footer-help" style={{ textDecoration: "none", color: "inherit" }}>
              <h3>Help Center</h3>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AgroBazaar. All rights reserved.</p>
      </div>
    </footer>
  );
}
