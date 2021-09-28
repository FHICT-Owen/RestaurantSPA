import {useEffect, useState} from 'react';
import axios from "axios";
import Dish from "./Dish"

interface IDish {
  id: number
  name: String
  description: String
  image: Buffer
}

export default function DishList() {
  
  let [dishes, setDishes] = useState<IDish[]>()
  const [, setLoaded] = useState(false)

  async function getDishes() {
    setDishes(dishes = (await axios.get(`${process.env.REACT_APP_MENU}/v1/dish`)).data)
  }

  useEffect(() => {
    getDishes().then(() => setLoaded(true))
  }, [])

  function createDishList() {
    if(dishes === undefined) return <li></li>
    else return dishes.map((dish: IDish, index) => (
      <Dish 
        key={index}
        name={dish.name} 
        description={dish.description} 
        image={dish.image} />
      )
    )
  }

  return <ul>{createDishList()}</ul>
}
