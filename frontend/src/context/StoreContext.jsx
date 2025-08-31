import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from 'axios' 

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const url = "https://food-delivery-backend-jkiy.onrender.com";
    const admin_url="https://food-delivery-admin-basm.onrender.com";
    const [token, setToken] = useState("");

    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] === 1) {
            setCartItems(prev => ({ ...prev, [itemId]: undefined }));
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
        
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }   

    const loadCartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData || {});
    } 

    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    useEffect(()=>{
            async function loadData() {
                await fetchFoodList();
            
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
        }
    }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        admin_url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;    
