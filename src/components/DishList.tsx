import { useFetch } from '../hooks/useFetch';
import { IDish } from "../types"
import Dish from "./Dish"

export default function DishList() {

  const {data: dishes, loading} = useFetch<IDish[]>(`${process.env.REACT_APP_MENU}/v1/dish`)

  function createDishList() {
    if (loading) return <li>loading...</li>
    else {
      if(dishes === null) return <li>no dishes found</li>
      else return dishes.map((dish) => (
        <Dish 
          id={dish.id}
          name={dish.name} 
          description={dish.description} 
          image={dish.image} />
        )
      )
    }
  }

  return <ul>{createDishList()}</ul>
}
