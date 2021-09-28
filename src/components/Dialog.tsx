import {useState} from 'react'
import axios from 'axios'
import "./Dialog.css"

interface IDish {
	id: number
	name: String
	description: String
	image: Buffer | null
  }

export default function Dialog() {

	let [toggle, onToggle] = useState(false)
	let [name, setName] = useState(String)
	let [description, setDescription] = useState(String) 
	let [dish, setDish] = useState<IDish>()

	function updateNameInput(evt: any) {
		setName(name = evt.target.value)
	}
	function updateDescriptionInput(evt: any) {
		setDescription(description = evt.target.value)
	}

	return (
		<>
			<button onClick={() => onToggle(toggle = !toggle)}>
			Add dish
			</button>
			<dialog className="Dialog" open={toggle}>
				<input value={name} onChange={(evt) => updateNameInput(evt)} className="Input"></input>
				<textarea value={description} onChange={(evt) => updateDescriptionInput(evt)} className="TextArea"></textarea>
				<input className="FileUpload" type="file"></input>
				<button onClick={
					async () => {
						setDish(dish = {id: 0, name: name, description: description, image: null})
						await axios.post(`${process.env.REACT_APP_MENU}/v1/dish`, dish)
						onToggle(toggle = !toggle)
					}
				}>Add</button>
			</dialog>
		</>
	)
}