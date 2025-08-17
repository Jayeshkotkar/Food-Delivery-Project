import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginPopUp = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    });
    


    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;

      setData(data=> ({...data,[name]:value}));
    }
 
    const onLogin = async(event)=>{
      event.preventDefault();
      let newUrl = url;
      if(currState === "Login"){
        newUrl += "/api/user/login";
      }
      else{
        newUrl += "/api/user/register";
      }

      try {
        const response = await axios.post(newUrl,data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false);
          if(currState === "Login") {
            setTimeout(() => toast.success(response.data.message), 100);
          } else {
            toast.success(response.data.message);
          }
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || (currState === "Login" ? "Login failed" : "Signup failed"));
        console.log(error.response);
      }
    }

  return (
    <div className='login-popup'>        
        <ToastContainer position="top-center" autoClose={2000} />
        <form onSubmit={onLogin} className='login-popup-container'>
           <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
           </div>
           <div className='login-popup-input'>
            {
            currState==="Login" ?<></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> 
            }
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          
           </div>
           <button  type='submit'>{currState==="Sign up" ? "Create account" : "Login"}</button>

           <div className='login-popup-condition'>
           <input type="checkbox" required />
           <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
           </div>
           {
            currState==="Sign up" ? <p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p> : <p>Create a new account? <span onClick={()=> setCurrState("Sign up")}>Click here</span></p>
           }

        </form>
    </div>
  )
}
