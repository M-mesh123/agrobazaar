import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // Check if user exists in farmerinfo
    const { data, error } = await supabase
      .from("farmerinfo")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();

      console.log("Login attempt:", { email, password });
console.log("Supabase returned:", data);
console.log("Supabase error:", error);

    if (error || !data) {
      alert("Invalid credentials");
      console.error(error);
      return;
    }

    onLogin({
  email: data.email,
  password: data.password,
  role: data.role || "farmer",
  name: data.name,
  phone: data.phone,
});

alert("Login successful!");
nav("/Dashboard");

    // alert("Login successful!");
    // nav("/Dashboard"); // redirect after successful login
  };

  return (
    <div className="container">
      <h2>Farmer Login</h2>
      <form onSubmit={submit}>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Link to="/forgotfarm">Forgot Password?</Link>
        </div>
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
