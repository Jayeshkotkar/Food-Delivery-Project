import React, { useState, useRef } from 'react'
import "./Add.css";
import upload_icon from "../../assets/upload_area.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "Salad",
  });
  
  const onChangeHandler = (e) => {    
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data, [name]: value}));
  }

  const fileInputRef = useRef(null);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    
    // Validate that image is selected
    if (!image) {
      alert("Please select an image");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.desc);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try { 
      const response = await axios.post(`${url}/api/food/add`, formData);
      console.log(response);
      if(response.data.success){  
        setData({
          name: "",
          desc: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      else{
        toast.error("Food Not Added");
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        alert('Network error: Please make sure the backend server is running on http://localhost:5000');
      } else {
        alert('Error adding product: ' + (error.response?.data?.message || error.message));
      }
    }
  }

  return ( 
    <div className='add'>
      <form onSubmit={onSubmitHandler}  className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : upload_icon} alt="upload_icon" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" name="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" id="name" name="name" placeholder='Enter Product Name' required />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.desc} name="desc" id="desc" rows="6" placeholder='Enter Product Description' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select onChange={onChangeHandler} name="category" id="category" required value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" id="price" name="price" placeholder='$20' min="0" required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD PRODUCT</button>
      </form>
    </div>
  )
}
