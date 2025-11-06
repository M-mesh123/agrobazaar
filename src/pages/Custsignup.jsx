import React, { useState } from "react";
// import "./Signup.css"; // same CSS file as Farmer Signup for consistency

export default function CustomerSignup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
    newsletter: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

      const customerData = { ...form, role: "customer" };

    const res = onSignup(customerData);

    if (res.ok) {
      alert("Signup successful!");
    } else {
      alert(res.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Customer Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form" autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          pattern="[0-9]{10}"
          maxLength="10"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <div className="row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          pattern="[0-9]{6}"
          value={form.pincode}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <div className="file-input">
          <label htmlFor="photo">Upload Profile Photo (optional):</label>
          <input
            id="photo"
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">
          Signup
        </button>
      </form>

      {/* Hidden fields to prevent browser autofill */}
      <input
        type="text"
        name="fakeusernameremembered"
        style={{ display: "none" }}
      />
      <input
        type="password"
        name="fakepasswordremembered"
        style={{ display: "none" }}
      />
    </div>
  );
}
