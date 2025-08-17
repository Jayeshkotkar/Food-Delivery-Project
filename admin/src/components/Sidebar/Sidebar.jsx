import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import add_icon from '../../assets/add_icon.png'
import order_icon from '../../assets/order_icon.png'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to="/add" className='sidebar-option'>
          <img src={add_icon} alt="add_icon" />
          <p>Add Product</p>
        </NavLink>
        <NavLink to="/list" className='sidebar-option'>
          <img src={order_icon} alt="order_icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className='sidebar-option'>
          <img src={order_icon} alt="order_icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}
