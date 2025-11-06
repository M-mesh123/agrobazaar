import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();


  const submit = async (e) => {
    e.preventDefault();

    const res = onLogin({ email, password, role: "farmer" });

    console.log("Login response:", res);

    if (res.ok) {
      alert("Login successful!");
      const role = res.user?.role?.toLowerCase();

      console.log("Detected role:", role);

      if (role === "farmer") {
        nav("/Dashboard");
      } else if (role === "customer") {
        nav("/Dashboard");
      } else {
        nav("/");
      }
    } else {
      alert(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Link to="/forgotfarm" style={{ color: "blue", textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </div>

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}