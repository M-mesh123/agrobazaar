import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sell from "./pages/Sell";
import MarketPrices from "./pages/MarketPrices";
import Cart from "./pages/Cart";
import HelpCenter from "./pages/HelpCenter";
import Custsignup from "./pages/Custsignup";
import Custlogin from "./pages/Custlogin";
// import Dashfarm from "./pages/Dashfarm";
import Forgotcust from "./pages/forgotcust";
import Forgotfarm from "./pages/forgotfarm";
import About from "./pages/About";
import Footer from "./pages/footer";





export default function App() {
  // const nav =useNavigate();
  // Predefined users
  const predefinedUsers = [
    { name: "Buyer", age: 25, email: "buyer@test.com", password: "1234", role: "customer" },
    { name: "Seller", age: 30, email: "seller@test.com", password: "1234", role: "farmer" },
  ];

// const nav =useNavigate();
  // Predefined crops
  const predefinedCrops = [
    {
      id: 1,
      name: "Wheat",
      price: 25,
      vendor: "Ram",
      image: "https://images.unsplash.com/photo-1582515073490-3998137a1b10?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Rice",
      price: 40,
      vendor: "Shyam",
      image: "https://images.unsplash.com/photo-1562440499-64fc0f7f5f5b?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Maize",
      price: 20,
      vendor: "Rita",
      image: "https://images.unsplash.com/photo-1608254896369-4bd1fa7d2d56?auto=format&fit=crop&w=800&q=60",
    },
  ];
// Separate storage for each user type
const [farmers, setFarmers] = useState([]);            
const [customers, setCustomers] = useState([]);




  // State management
  const [users] = useState(predefinedUsers);
  const [tempUsers, setTempUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

    

  // const [crops, setCrops] = useState(predefinedCrops);
  const [cart, setCart] = useState([]);

  const allUsers = [...users, ...tempUsers];
  


  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", price: 30, stock: 100, vendor: "Farmer A", image: "" },
  ]);

  // Add crop (Farmer)
  function handleAddCrop(newCrop) {
    setCrops([...crops, newCrop]);
  }

  // Remove crop (Farmer)
  function handleRemoveCrop(id) {
    setCrops(crops.filter(c => c.id !== id));
  }


  //  FARMER    Signup---------------------------------------------->
 function handleSignup(newUser) {
  if (newUser.role === "farmer") {           
    const duplicate = farmers.find(
      (u) =>
        u.phone === newUser.phone ||
        (newUser.email && u.email === newUser.email)
    );
    if (duplicate) {
      return { ok: false, message: "Farmer with this phone or email already exists" };
    }
    setFarmers((prev) => [...prev, newUser]);
    return { ok: true };
  }

  if (newUser.role === "customer") {
    const duplicate = customers.find(
      (u) =>
        u.phone === newUser.phone ||
        (newUser.email && u.email === newUser.email)
    );
    if (duplicate) {
      return { ok: false, message: "Customer with this phone or email already exists" };
    }
    setCustomers((prev) => [...prev, newUser]);
    return { ok: true };
  }

  return { ok: false, message: "Invalid role" };
}




  //  FARMER Login--------------------------------------------------------->
  function handleLogin(user) {              
  // let userList = [];

  // if (role === "farmer") userList = [...farmers, ...predefinedUsers.filter(u => u.role === "farmer")];
  // else if (role === "customer") userList = [...customers, ...predefinedUsers.filter(u => u.role === "customer")];

  // const u = userList.find(
  //   (x) =>
  //     (x.email === email || x.phone === email) && x.password === password
  // );

  // if (!u) return { ok: false, message: "Invalid credentials" };
  setCurrentUser(user);

  
  return { ok: true, user};

}



// ===============================================================
// 🧩 CUSTOMER SIGNUP
function handleCustomerSignup(user) {
  // const duplicate = customers.find(
  //   (u) => u.phone === newCustomer.phone || (newCustomer.email && u.email === newCustomer.email)
  // );

  // if (duplicate) {
  //   return { ok: false, message: "Customer with this phone or email already exists" };
  // }

  // setCustomers((prev) => [...prev, newCustomer]);
    if (user.role === "customer") setCustomers((prev) => [...prev, user]);
  return { ok: true };
}

// 🧩 CUSTOMER LOGIN
function handleCustomerLogin(user) {
  console.log("handleCustomerLogin called with:", user);

  if (!user) {
    console.error("No user received!");
    return { ok: false, message: "Invalid login" };
  }

  setCurrentUser(user); // ✅ set user directly
  console.log("Current user set:", user);
  return { ok: true, user };
}

// =========================================================


  // Logout
  function handleLogout() {
    setCurrentUser(null);
    setCart([]);
  }

  // Add Crop (for farmer)
  function handleAddCrop({ name, price, imageData }) {
    const id = Date.now();
    const vendor = currentUser ? currentUser.name : "Unknown";
    const crop = { id, name, price: Number(price), vendor, image: imageData || "" };
    setCrops(prev => [crop, ...prev]);
  }

  // Add to Cart (for buyer/seller)
  function handleAddToCart(crop, quantity) {
    const totalPrice = crop.price * quantity;
    const item = { ...crop, quantity, totalPrice };
    setCart(prev => [...prev, item]);
    alert(`${quantity}kg of ${crop.name} added to cart!`);
  }


  function handleRemoveFromCart(itemToRemove) {
  setCart((prevCart) =>
    prevCart.filter((item) => item.name !== itemToRemove.name)
  );
}






  return (
 
    <BrowserRouter>
      <Navbar user={currentUser} onLogout={handleLogout} cartCount={cart.length} />
      <div className="page">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          <Route path="/Signup" element={<Signup onSignup={handleSignup} />} />

          <Route path="/Login" element={ <Login onLogin={handleLogin} />} />

          <Route path="/Custsignup" element={<Custsignup onSignup={handleCustomerSignup} />} />


          <Route path="/Custlogin" element={<Custlogin onLogin={handleCustomerLogin} />}/>

          <Route path="/forgotcust" element={<Forgotcust />} />
          <Route path="/forgotfarm" element={<Forgotfarm />} />
           <Route path="/About" element={<About />} />



          {/* { Dashboard */}
          {/* { <Route
            path="/Dashboard"
            element={
              currentUser ? (
                <Dashboard
                  crops={crops}
                  user={currentUser}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onRemoveCrop={handleRemoveCrop}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          /> }
         
 */}
<Route
  path="/Dashboard"
  element={
    currentUser ? (
      currentUser.role === "customer" ? (
        (() => {
          console.log("Rendering Customer Dashboard", currentUser);
          return (
            <Dashboard
              crops={crops}
              user={currentUser}
              cart={cart}
              onAddToCart={handleAddToCart}
            />
          );
        })()
      ) : currentUser.role === "farmer" ? (
        (() => {
          console.log("Rendering Farmer Dashboard", currentUser);
          return (
            <Dashboard
              crops={crops}
              user={currentUser}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveCrop={handleRemoveCrop}
            />
          );
        })()
      ) : (
        <Navigate to="/" />
      )
    ) : (
      <Navigate to="/" />
    )
  }
/>




          {/* Sell route for farmers */}
          <Route
            path="/sell"
            element={
              currentUser && currentUser.role === "farmer" ? (
                <Sell user={currentUser} onAddCrop={handleAddCrop} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />

          <Route path="/market" element={<MarketPrices />} />

          {/* Cart route for all logged-in users */}
          <Route
            path="/cart"
            element={
              currentUser ? (
                <Cart cart={cart} 
                user={currentUser}
                onRemoveFromCart={handleRemoveFromCart}/>
              ) : (
                <Navigate to="/" />
              )
            }
          />



          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );







}

