import React, { useState } from "react";

export default function Sell({ onAddCrop, user }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState("");

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price) {
      alert("Please enter crop name and price");
      return;
    }
    onAddCrop({ name, price,description,imageData });
    setName("");
    setPrice("");
    setDescription("");
    setImageData("");
  }

  // Optional safety, but route ensures user is farmer
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
        ></textarea>


        
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit" className="btn">
          Add Crop
        </button>
      </form>
    </div>
  );
}
