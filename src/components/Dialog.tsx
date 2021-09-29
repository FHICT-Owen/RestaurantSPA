import {useState} from 'react'
import {IDish} from "../types"
import axios from 'axios'
import "./Dialog.css"

export default function Dialog() {

	let [toggle, onToggle] = useState(false)
	let [name, setName] = useState(String)
	let [description, setDescription] = useState(String)
	let [image, setImage] = useState<number[]>([])
	let [dish, setDish] = useState<IDish>({id: 0, name: "", description: "", image: []})

	function updateNameInput(evt: any) {
		setName(name = evt.target.value)
	}
	function updateDescriptionInput(evt: any) {
		setDescription(description = evt.target.value)
	}

	const updateImageInput = (e: any) => {
		var files: FileList = e.target.files
		files[0].arrayBuffer().then((result) => setImage(image = [...new Uint8Array(result)]))
	}

	function switchButtons(showAdd: boolean) {
		if (showAdd) {
			return <button onClick={
				async () => {
					setDish(dish = {id: 0, name: name, description: description, image: image})
					await axios.post(`${process.env.REACT_APP_MENU}/v1/dish`, dish)
					onToggle(toggle = !toggle)
				}
			}>Add</button>
			
		}
			// <button onClick={
			// 	async () => {
			// 		setDish(dish = {id: 0, name: name, description: description, image: null})
			// 		await axios.put(`${process.env.REACT_APP_MENU}/v1/dish`, dish)
			// 		onToggle(toggle = !toggle)
			// 	}
			// }>Edit</button>
	}

	return (
		<>
			<button onClick={() => onToggle(toggle = !toggle)}>
			Add dish
			</button>
			<dialog className="Dialog" open={toggle}>
				<input className="Input" value={name} onChange={(evt) => updateNameInput(evt)} ></input>
				<textarea className="TextArea" value={description} onChange={(evt) => updateDescriptionInput(evt)} ></textarea>
				<input type="file" className="FileUpload" onChange={updateImageInput}></input>
				{switchButtons(true)}
			</dialog>
		</>
	)
}