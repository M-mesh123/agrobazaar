import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Custlogin.css"; // we'll add matching style below

export default function CustomerLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = onLogin({ email, password,role:"customer" });

    if (!res.ok) {
      alert(res.message || "Invalid login credentials");
      return;
    }

    if (res.user.role !== "customer") {
      alert("Access denied! Please login as a customer.");
      return;
    }

    alert("Login successful!");
    nav("/Dashboard");
  };

  return (
    <div className="customer-login-container">
      <div className="login-box">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email / Phone</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="signup-link">
            Don’t have an account?{" "}
            <Link to="/Custsignup">Sign Up</Link>
          </p>

          <p className="forgot-password">
            <Link to="/forgotcust">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
