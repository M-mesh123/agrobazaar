import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Sell({ user }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !imageFile) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      // ✅ 1. Upload image to Supabase Storage bucket 'crops/cropimg/'
      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = `cropimg/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("crops")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // ✅ 2. Get public image URL
      const { data: publicUrlData } = supabase.storage
        .from("crops")
        .getPublicUrl(filePath);
      const imageUrl = publicUrlData.publicUrl;

      // ✅ 3. Insert crop details into 'crop_details' table
      const { data, error: insertError } = await supabase
        .from("crop_details")
        .insert([
          {
            name,
            price,
            description,
            image_url: imageUrl,
            // temporarily skip farmer_id since your user is local
          },
        ])
        .select();

      if (insertError) throw insertError;

      console.log("✅ Crop inserted:", data);
      alert("✅ Crop added successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error("❌ Error uploading crop:", error.message);
      alert("Failed to add crop: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user.role !== "farmer") {
    return (
      <div className="container">
        <h2>Access Denied</h2>
        <p>Only farmers can add crops for selling.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Sell Your Crop</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Crop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price per kg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Enter crop description (e.g. type, quality, location, etc.)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "none",
          }}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Uploading..." : "Add Crop"}
        </button>
      </form>
    </div>
  );
}
