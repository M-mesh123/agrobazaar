import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function FarmerDashboard({ crops = [], user, onAddCrop, onRemoveCrop }) {
  const [newCrop, setNewCrop] = useState({ name: "", price: "", stock: "", image: "" });
  const [isSellOpen, setIsSellOpen] = useState(false);

  // Handle adding a new crop
  function handleSell(e) {
    e.preventDefault();
    if (!newCrop.name || !newCrop.price || !newCrop.stock) {
      alert("Please fill all fields");
      return;
    }
    onAddCrop({
      ...newCrop,
      id: Date.now(),
      vendor: user?.name || "Unknown Farmer",
      price: Number(newCrop.price),
      stock: Number(newCrop.stock),
    });
    setNewCrop({ name: "", price: "", stock: "", image: "" });
    setIsSellOpen(false);
  }

  return (
    <div className="container">
      <h2>Farmer Dashboard</h2>


      <div className="sell-btn-container">
        <Link to="/sell">
          <button className="sell-btn">+ Sell Crop</button>
        </Link>
      </div>


      {/* Sell Crop Modal */}
      {isSellOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Sell a New Crop</h3>
            <form onSubmit={handleSell}>
              <input
                type="text"
                placeholder="Crop Name"
                value={newCrop.name}
                onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price per kg (₹)"
                value={newCrop.price}
                onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Available Stock (kg)"
                value={newCrop.stock}
                onChange={(e) => setNewCrop({ ...newCrop, stock: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={newCrop.image}
                onChange={(e) => setNewCrop({ ...newCrop, image: e.target.value })}
              />
              <div className="modal-actions">
                <button type="submit" className="btn">Add Crop</button>
                <button type="button" className="btn cancel" onClick={() => setIsSellOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Crop Listing */}
      <div className="grid">
        {crops?.length === 0 ? (
          <p>No crops added yet.</p>
        ) : (
          crops.map((c) => (
            <div className="card" key={c.id}>
              <div className="card-image">
                <img
                  src={c.image || "https://via.placeholder.com/300x180?text=No+Image"}
                  alt={c.name}
                />
              </div>
              <div className="card-body">
                <h3>{c.name}</h3>
                <p><b>Price:</b> ₹{c.price}/kg</p>
                <p><b>Stock:</b> {c.stock} kg</p>
                <p><b>Farmer:</b> {c.vendor}</p>
                <div className="farmer-actions">
                  {c.stock === 0 ? (
                    <button className="remove-btn" onClick={() => onRemoveCrop(c.id)}>
                      Remove Crop
                    </button>
                  ) : (
                    <p className="in-stock">✅ In Stock</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
