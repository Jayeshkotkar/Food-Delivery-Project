import React, { useState, useEffect }   from 'react'
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';

export const List = ({url}) => {

  const [list, setList] = useState([]);

  const getList = async () => { 
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if(response.data.success){
        setList(response.data.data);
      }
      else{
        toast.error("Failed to get list");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const removeFood = async (foodId) => {
    // Add confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this food item? This action cannot be undone.");
    
    if (!confirmDelete) {
      return; // User cancelled, don't proceed with deletion
    }

    try {
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      console.log(response.data)
      if(response.data.success){
        toast.success(response.data.message);
        await getList();
      }
      else{
        toast.error("Failed to Remove Food");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting food item");
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
          <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
              <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
              </div>
              {list.map((item,index) => (
                <div className="list-table-format" key={index}>
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p className='cursor' onClick={() => removeFood(item._id)} >X</p>
                </div>
              ))}
            </div>
          </div>
  )
}
