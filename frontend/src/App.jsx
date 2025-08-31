import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './pages/Home/Home'
import { Cart } from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { LoginPopUp } from './components/LoginPopUp/LoginPopUp'
import { AdminLogin } from './components/AdminLogin/AdminLogin'
import { useState } from 'react'
import { Verify } from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      {showAdminLogin ? <AdminLogin setShowAdminLogin={setShowAdminLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowAdminLogin={setShowAdminLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
