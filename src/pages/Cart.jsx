import React, { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

const RAZORPAY_TEST_KEY = "rzp_test_RIE5sCdy3ZSkX8";

export default function Cart({ cart = [], user, onRemoveFromCart }) {
  const [showButton, setShowButton] = useState(false);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowButton(true);
      else setShowButton(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   function handlePayment() {
    if (!user) {
      alert("Please login first");
      return;
    }   




    const options = {
      key: RAZORPAY_TEST_KEY,
      amount: totalPrice * 100,
      currency: "INR",
      name: "FarmBazaar",
      description: "Crop Purchase",
      handler: (response) =>
        alert(`Payment successful! Payment id: ${response.razorpay_payment_id}`),
      prefill: {
        name: user.name,
        email: user.email,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="container">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="grid">
            {cart.map((item, i) => (
              <div className="card" key={i}>
                <div className="card-image">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                </div>
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p>
                    Quantity: <b>{item.quantity} kg</b>
                  </p>
                  <p>
                    Price: <b>₹{item.price}/kg</b>
                  </p>
                  <p>
                    Total: <b>₹{item.totalPrice}</b>
                  </p>

                  <button
                    className="btn-remove"
                    onClick={() => onRemoveFromCart(item)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3>Total Amount: ₹{totalPrice}</h3>

          {/* ✅ Animated floating payment button */}
          <div className={`floating-payment ${showButton ? "visible" : ""}`}>
            <button className="btn" onClick={handlePayment}>
              Proceed to Payment 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}
