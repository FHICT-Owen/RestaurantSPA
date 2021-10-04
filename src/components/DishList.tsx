import { useContext } from 'react';
import { AppContext } from '../context';
import { Types } from '../reducers';
import Dish from "./Dish"

export default function DishList() {

  const { state, dispatch } = useContext(AppContext);

  function createDishList() {
    if (state.dishes.loading) return <li>loading...</li>
    else {
      if(state.dishes.data === null) return <li>error occurred</li>
      else if(state.dishes.data.length > 0) return state.dishes.data.map((dish) => (
        <li key={dish.id} onClick={() => dispatch({type: Types.Edit, payload: dish})}>
          <Dish 
            id={dish.id}
            name={dish.name} 
            description={dish.description} 
            image={dish.image} />
        </li>
        )
      )
      else return <li>no dishes found</li>
    }
  }

  return <ul>{createDishList()}</ul>
}
