import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./styles.css";

export default function CustomerForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your registered email");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-heading">Customer Forgot Password</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="forgot-form">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-input"
          />
          <button className="forgot-btn" type="submit">
            Send Reset Link
          </button>
        </form>
      ) : (
        <div className="confirmation">
          <p>
            A password reset link has been sent to <b>{email}</b>.  
            Please check your inbox.
          </p>
          <button className="forgot-btn" onClick={() => nav("/login")}>
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
}
