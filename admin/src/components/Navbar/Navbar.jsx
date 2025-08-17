import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import userImg from '../../assets/profile_icon.png'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt="logo" />
      <img className='profile' src={userImg} alt="user" />
    </div>
  )
}
