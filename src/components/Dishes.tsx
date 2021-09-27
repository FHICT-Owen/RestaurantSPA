import React, {useEffect, useState} from 'react';
import image from "../images/placeholder.jpg"
import axios from "axios";

export default function Dishes() {

  const [dishes, setDishes ] = useState([]);
  
  var url = "http://localhost:8080/api/v1/dish";

  const fetchDishes = () => {
    axios.get(url).then(res => {
      console.log(res);
      setDishes(res.data);
    });
  }

  useEffect(() => {
    //First coins fetch
    fetchDishes();
    // refresh coins every 50 seconds
    // External API refreshes every minute
    const interval = setInterval(() => fetchDishes(), 50000)
    return () => {
      clearInterval(interval);
    }
  }, []);

  return dishes.map((dish: any, index) => {
      return ( 
          <div className="container menu-card">
            <div className="menu-item">
              <div>
                  <img className="menu-image" src={image} alt="menu-item-1"/>
              </div>
              <div className="menu-text">
                  <h5>{dish.name}</h5>
                  <p className="menu-description">{dish.description}</p>
              </div>
            </div>
          </div>
        );
    });
  };  