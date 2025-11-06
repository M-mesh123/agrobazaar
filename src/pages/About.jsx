import React from "react";
import "../App.css";

export default function About() {
  return (
    <div className="about-container" style={styles.container}>
      <h1 style={styles.heading}>About AgroBazaar</h1>
      <p style={styles.text}>
        Welcome to <strong>AgroBazaar</strong> — your one-stop digital platform connecting 
        <strong> farmers and customers directly</strong>. Our mission is to empower farmers 
        by providing them fair market access and helping customers get fresh, 
        quality produce without middlemen.
      </p>

      <h2 style={styles.subHeading}>Our Mission</h2>
      <p style={styles.text}>
        We aim to revolutionize the agricultural supply chain by bringing transparency, 
        trust, and technology together. Farmers can list their crops, set their prices, 
        and reach a wide network of buyers across regions.
      </p>

      <h2 style={styles.subHeading}>Why Choose Us?</h2>
      <ul style={styles.list}>
        <li>Direct farmer-to-customer connection</li>
        <li>Fair pricing and transparent transactions</li>
        <li>Fresh and quality-assured produce</li>
        <li>Secure payment and easy delivery options</li>
      </ul>

      <h2 style={styles.subHeading}>Our Vision</h2>
      <p style={styles.text}>
        To build a sustainable and inclusive digital ecosystem where agriculture meets innovation — 
        ensuring prosperity for farmers and healthy choices for consumers.
      </p>

      <div style={styles.footer}>
        <p>🌾 Together, we grow with trust and technology. 🌾</p>
      </div>
    </div>

    
  );
  
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    lineHeight: "1.8",
  },
  heading: {
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: "20px",
  },
  subHeading: {
    color: "#388E3C",
    marginTop: "25px",
  },
  text: {
    fontSize: "18px",
    color: "#333",
  },
  list: {
    fontSize: "18px",
    color: "#333",
    marginLeft: "20px",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontStyle: "italic",
    color: "#4CAF50",
  },
};
