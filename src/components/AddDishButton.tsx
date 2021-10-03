// import { ActionKind } from "../types"
import { useToggle } from "./Provider"

// export default function AddDishButton() {

// 	// const {dispatch} = useToggle()
// 	return (
// 		<button onClick={()=>{dispatch({type: ActionKind.add, payload: {id: 0, name: "", description: "", image: []}})}}>Add</button>
// 	)
// }

export default function AddDishButton() {

	const {dispatch} = useToggle()

	return <button onClick={()=> dispatch({type: 'add'})}>Add</button>
}