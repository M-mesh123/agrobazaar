// src/pages/HelpCenter.jsx
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function HelpCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: ""
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    // Replace these with your EmailJS credentials
    const serviceID = "service_247kjfk";
    const templateID = "template_wmysvs6";
    const publicKey = "J8gKKrBoDCBNC1sAl";

    // Send email via EmailJS
    emailjs.send(serviceID, templateID, {
      name: formData.name,
      email: formData.email,
      query: formData.query
    }, publicKey)
      .then(() => {
        setStatus("✅ Your query has been sent successfully!");
        setFormData({ name: "", email: "", query: "" });
      })
      .catch((err) => {
        console.error(err);
        setStatus("❌ Failed to send. Please try again later.");
      });
  }

  return (
    <div className="container">
      <h2>Help Center</h2>
      <p>Have a problem or query? Reach out to us and we’ll respond via email.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="query"
          placeholder="Your Query / Problem"
          value={formData.query}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn">Submit</button>
      </form>

      {status && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{status}</p>}
    </div>
  );
}
