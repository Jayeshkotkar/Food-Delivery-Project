import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);

  // if(!token){
  //   toast.error("Please login to proceed to checkout");
  // }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id]) {
              return (
                <div key={item._id}>
                  <div className="cart-item-items">
                    <img src={url+"/images/"+item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
            return null;
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total Amount</b>
              <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
            <button onClick={()=> {
                if(token){
                    navigate("/order");
                }else{
                  toast.error("Please login to proceed to checkout");
                    navigate("/login");
                }
            }} type='submit'>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div className="">
            <p>if you have a promo code, please enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Enter your promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
