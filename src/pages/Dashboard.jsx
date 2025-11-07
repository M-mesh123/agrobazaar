import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";       

export default function Dashboard({ crops, user, cart = [], onAddToCart, onRemoveCrop }) {
  const [orders, setOrders] = useState([]); // orders can be used later if needed
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellSidebarOpen, setIsSellSidebarOpen] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const nav = useNavigate();

  // Removed Supabase logic completely (no fetchOrders or useEffect)

  function handleAdd() {
    if (!selectedCrop || quantity < 1) return;
    onAddToCart(selectedCrop, quantity);
    setSelectedCrop(null);
    setQuantity(1);
    setIsCartOpen(true);
  }

  function handleSell() {
    nav("/sell");
  }

  function toggleRemoveMode() {
    setIsRemoveMode(!isRemoveMode);
  }

  function handleRemoveSingleCrop(cropId, cropName) {
    if (window.confirm(`Are you sure you want to remove ${cropName}?`)) {
      if (onRemoveCrop) onRemoveCrop(cropId);
    }
  }

  // Example: Dashboard.jsx


// async function fetchCrops() {
//   const { data, error } = await supabase.from("crops").select("*");
//   if (error) console.error(error);
//   else console.log("Fetched crops:", data);
// }

  const isFarmer = user?.role === "farmer";
  const isCustomer = user?.role === "customer";

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
<h2>
        {isFarmer
            ? `Welcome, Farmer ${user?.name || ""}`
            : `Welcome, ${user?.name || "Customer"} 👋`}
        </h2>
      </div>

      {/* Crop Grid */}
      <div className="grid">
        {crops?.map((c) => (
          <div className={`card ${isRemoveMode ? "shake" : ""}`} key={c.id}>
            {/* Cross icon for remove mode */}
            {isRemoveMode && (
              <button
                className="remove-cross-btn fade-in"
                onClick={() => handleRemoveSingleCrop(c.id, c.name)}
              >
                ✖
              </button>
            )}

            <div className="card-image">
              <img
                src={c.image ||c.imageData || "https://via.placeholder.com/300x180?text=No+Image"}
                alt={c.name}
              />

              {/* Hover Description Overlay */}
              {c.description && (
                <div className="card-overlay">
                  <p>{c.description}</p>
                </div>
              )}
            </div>

            <div className="card-body">
              <h3>{c.name}</h3>
              <p><b>Price:</b> ₹{c.price}/kg</p>
              <p><b>Vendor:</b> {c.vendor}</p>
              <button
                className="btn"
                onClick={() => {
                  setSelectedCrop(c);
                  setIsCartOpen(true);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Cart */}
      {isCustomer &&(
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>
          ✖
        </button>
        <h3>Your Cart</h3>

        {selectedCrop && (
          <div className="cart-item-input">
            <p><b>{selectedCrop.name}</b> (₹{selectedCrop.price}/kg)</p>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        )}

        {cart?.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                {item.quantity} kg {item.name} – ₹{item.totalPrice}
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="cart-footer">
            <p>
              <b>Total: ₹{cart.reduce((sum, item) => sum + item.totalPrice, 0)}</b>
            </p>
          </div>
        )}
      </div>
      )}

      {/* SELL SIDEBAR (Farmer Only) */}
      {user?.role === "farmer" && (
        <>
          <button
            className="floating-sell-btn"
            onClick={() => setIsSellSidebarOpen(true)}
          >
            💰 Sell Crops
          </button>

          <div className={`sell-sidebar ${isSellSidebarOpen ? "open" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setIsSellSidebarOpen(false)}
            >
              ✖
            </button>
            <h3>Farmer Panel</h3>
            <p>Manage your crops and sales directly from here.</p>

            <button className="btn sell-action-btn" onClick={handleSell}>
              Go to Sell Page
            </button>

            <button
              className={`btn remove-crops-btn ${isRemoveMode ? "active" : ""}`}
              onClick={toggleRemoveMode}
            >
              {isRemoveMode ? "❌ Exit Remove Mode" : "🗑 Remove Crops"}
            </button>
          </div>
        </>
      )}

      {/* ORDERS SECTION - Visible only to Farmers */}
      {user?.role === "farmer" && (
        <div className="orders-section">
          <h3>Customer Orders</h3>

          {orders.length === 0 ? (
            <p>No customer purchases yet.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Crop</th>
                  <th>Quantity (kg)</th>
                  <th>Total (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.customer_name}</td>
                    <td>{o.customer_email}</td>
                    <td>{o.crop_name}</td>
                    <td>{o.quantity}</td>
                    <td>{o.total_price}</td>
                    <td>{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
