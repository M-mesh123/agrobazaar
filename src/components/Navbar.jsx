import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "E:/AgroBazaar/src/components/web.jpg";

export default function Navbar({ user, onLogout, cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    if (onLogout) onLogout();
    navigate("/");
  }

  const onHomePage = location.pathname === "/";
  const onSignupPage = location.pathname.startsWith("/Signup"); // ✅ Covers all signup routes
  const onLoginPage = location.pathname.startsWith("/Login");



  console.log("Navbar user:", user); // 👈 Debug line

  return (
    <header className="nav" role="navigation" style={{ zIndex: 1000 }}>
      <div className="brand">
        <img src={logo} alt="AgroBazaar Logo" className="brand-logo" />
        <span className="brand-name">AgroBazaar</span>
      </div>
<nav>
  {!user && <Link to="/Home" className="nav-link">🏚️ Home</Link>}

  {/* Show Login/Signup only when not logged in AND not on their respective pages */}
  {!user && !onHomePage && !onLoginPage && (
    <Link to="/login" className="nav-link">Login</Link>
  )}

  {!user && !onHomePage && !onSignupPage && (
    <Link to="/signup" className="nav-link">Signup</Link>
  )}

  {user && (
    <>
      {user.role === "customer" && (
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      )}
      {user.role === "farmer" && (
        <>
          <Link to="/farmdash" className="nav-link">Dashboard</Link>
         
        </>
      )}

      <Link to="/cart" className="nav-link">
        Cart {cartCount > 0 && <span>({cartCount})</span>}
      </Link>

      <span className="nav-user">Hi, {user.name}</span>
      <button className="btn-logout" onClick={logout}>Logout</button>
    </>
  )}
</nav>

      
    </header>
  );
}
