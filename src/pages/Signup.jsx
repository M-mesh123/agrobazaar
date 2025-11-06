import React, { useState } from "react";
import Footer from "../pages/footer";
import { Link } from "react-router-dom";


export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer"); // default
  const [profilePhoto, setProfilePhoto] = useState(null);

    function handleSubmit(e) {
    e.preventDefault();

    // basic validation
    if (!name || !phone || !password || !confirmPassword || !address) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const signupData = {name, phone, email, address, password,role:"farmer",   profilePhoto, // file object
    };


    

    const res = onSignup(signupData);

    if (res.ok) {
      alert("Signup successful!");
    } else {
      alert(res.message || "Signup failed");
    }
  }

  // Handle photo upload
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  }

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          pattern="[0-9]{10}"
          maxLength="10"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <div className="file-input">
          <label htmlFor="photo">Upload Profile Photo:</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        <button type="submit" className="btn">Signup</button>
      </form>
      <form onSubmit={handleSubmit} className="signup-form" autoComplete="off">
        {/* form fields */}
      </form>

      <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />
      <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />

      


    </div>
    
    
  );
}
