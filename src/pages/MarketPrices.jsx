import React from "react";

const marketList = [
  {
    crop: "Wheat",
    price: "₹22/kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    crop: "Rice",
    price: "₹30/kg",
    image: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    crop: "Maize",
    price: "₹18/kg",
    image: "https://images.unsplash.com/photo-1649251037566-6881b4956615?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    crop: "Sugarcane",
    price: "₹25/kg",
    image: "https://images.unsplash.com/photo-1585155113372-6c1808141bf3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


export default function MarketPrices() {
  return (
    <div className="container">
      <h2>Market Prices</h2>
      <div className="grid">
        {marketList.map((m, i) => (
          <div className="card" key={i}>
            <div className="card-image"><img src={m.image} alt={m.crop} /></div>
            <div className="card-body">
              <h3>{m.crop}</h3>
              <p><b>Modal Price:</b> {m.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
