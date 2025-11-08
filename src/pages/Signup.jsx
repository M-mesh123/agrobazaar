import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // ✅ ensure correct path

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !password || !confirmPassword || !address) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Optional: Upload profile photo
    let photoUrl = null;
    if (profilePhoto) {
      const { data, error } = await supabase.storage
        .from("profile_imgs") // make sure the bucket exists in Supabase
        .upload(`farmer/${Date.now()}_${profilePhoto.name}`, profilePhoto);

      if (error) {
        console.error("Photo upload failed:", error.message);
      } else {
        const { data: publicURL } = supabase.storage
          .from("profile_imgs")
          .getPublicUrl(data.path);
        photoUrl = publicURL.publicUrl;
      }
    }

    // Insert into database
    const { data, error } = await supabase
      .from("farmerinfo")
      .insert([
        {
          name,
          phone,
          email,
          address,
          password, // ⚠️ store securely or hash in production
          role: "farmer",
          profile_photo: photoUrl,
        },
      ]);

    if (error) {
      alert(`Signup failed: ${error.message}`);
      console.error(error);
    } else {
      alert("Signup successful!");
    }
  };

  return (
    <div className="container">
      <h2>Farmer Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />


        <input type="tel" placeholder="Phone"    pattern="[0-9]{10}"
          maxLength="10" value={phone} onChange={(e) => setPhone(e.target.value)} required />


        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />


        <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />


        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />


        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />


        <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />


        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
}
