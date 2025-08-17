import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

export const Navbar = ({ setShowLogin, setShowAdminLogin }) => {

  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setMobileOpen(false);
  }

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => { setMenu("home"); setMobileOpen(false); }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => { setMenu("menu"); setMobileOpen(false); }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => { setMenu("mobile-app"); setMobileOpen(false); }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => { setMenu("contact us"); setMobileOpen(false); }} className={menu === "contact us" ? "active" : ""}>contact us</a>
        {mobileOpen && (
          !token ? (
            <div className="drawer-auth">
              <button onClick={() => { setShowLogin(true); setMobileOpen(false); }} className="drawer-btn">Login</button>
              <button onClick={() => { setShowAdminLogin(true); setMobileOpen(false); }} className="drawer-btn">Admin</button>
            </div>
          ) : (
            <div className="drawer-auth">
              <button onClick={() => { navigate('/myorders'); setMobileOpen(false); }} className="drawer-btn">Orders</button>
              <button onClick={logout} className="drawer-btn">Logout</button>
            </div>
          )
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>
        {
          !token ? 
          <div className="navbar-buttons">
            <button onClick={() => setShowLogin(true)}>sign in</button>
            <button onClick={() => setShowAdminLogin(true)}>Admin</button> 

          </div>
            :<>
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate("/myorders") }><img src={assets.bag_icon} alt="bag-icon" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="logout-icon" /><p>Logout</p></li>
              </ul>
            </div>
            </>

        }
        <button
          className={`hamburger ${mobileOpen ? 'active' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)}></div>}
    </div>
  )
}
