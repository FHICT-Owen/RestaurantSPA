import { useContext } from "react";
import { AppContext } from "../context"
import { Types } from "../reducers"

export default function AddDishButton() {

	const { dispatch } = useContext(AppContext);

	return <button onClick={()=> dispatch({type: Types.Add})}>Add</button>
}