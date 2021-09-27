import {useEffect, useState} from 'react';
import axios from "axios";

interface Dish {
  id: number
  name: String
  description: String
  image: any
}


export default function Dishes() {

  let [dishes] = useState([]);

  useEffect(() => fetchDishes())

  const fetchDishes = () => {
    axios.get(`${process.env.REACT_APP_MENU}/api/v1/dish`).then(res => {
      console.log(res.data)
      dishes = res.data
    });
  }


  function setDishes(): any {
    return dishes.map((dishes: Dish[], index: id) =>
    <li key={index}>
      <div className="container menu-card">
        <div className="menu-item">
          <div>
            <img className="menu-image" alt="menu-item-1"/>
          </div>
          <div className="menu-text">
            <h5>{dish.name}</h5>
            <p className="menu-description">{dish.description}</p>
          </div>
        </div>
      </div>
    </li>);
  }

  return <ul>{setDishes}</ul>
}