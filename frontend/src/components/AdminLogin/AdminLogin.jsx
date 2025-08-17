import React, { useContext, useState } from 'react'
import './AdminLogin.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminLogin = ({setShowAdminLogin}) => {


    const {url, setToken, admin_url} = useContext(StoreContext)

    const [data, setData] = useState({
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
      newUrl += "/api/admin/login";

      try {
        const response = await axios.post(newUrl,data);
        if(response.data.success){
          toast.success(response.data.message);
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowAdminLogin(false);
          // Redirect to admin panel
          setTimeout(() => {
            window.open(`${admin_url}/add`);
          }, 1000);
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        console.log(error.response);
      }
    }

    const onLoad = () => {
      alert("For admin login, please use the following credentials: email: jayeshkotkar01@gmail.com, password: Jayesh@1234");
    }

  return (
    <div className='login-popup'>        
        <ToastContainer position="top-center" autoClose={2000} />
        <form onSubmit={onLogin} onLoad={onLoad} className='login-popup-container'>

           <div className='login-popup-title'>
            <h2>Admin Login</h2>
            <img onClick={()=> setShowAdminLogin(false)} src={assets.cross_icon} alt="" />
           </div>
           <div className='login-popup-input'>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          
           </div>
           <button  type='submit'>Login</button>
        </form>
    </div>
  )
}

export default AdminLogin;