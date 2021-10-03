import { useState } from 'react'
import { useForm } from '../hooks/useForm';
import { IDish } from "../types"
import axios from 'axios'
import "./Dialog.css"
import { useToggle } from './Provider';

export default function Dialog() {

	const [values, handleOnChange] = useForm<{name: string, description: string}>({name: '', description: ''})
	const [image, setImage] = useState<number[]>([])
	let [dish, setDish] = useState<IDish>({id: 0, name: "", description: "", image: []})

	const context = useToggle()

	const updateImageInput = (e: any) => {
		var files: FileList = e.target.files
		files[0].arrayBuffer().then((result) => setImage([...new Uint8Array(result)]))
	}

	function switchButtons(showAdd: boolean) {
		return showAdd ?
			<button onClick={
				async () => {
					setDish(dish = {id: 0, name: values.name, description: values.description, image: image})
					await axios.post(`${process.env.REACT_APP_MENU}/v1/dish`, dish)
				}
			}>Add</button>
		:
			<button onClick={
				async () => {
					setDish(dish = {id: 0, name: values.name, description: values.description, image: image})
					await axios.put(`${process.env.REACT_APP_MENU}/v1/dish`, dish)
				}
			}>Edit</button>
	}

	return (
		<dialog className="Dialog" open={context.state.isOpen}>
			<input 
				className="Input"
				name="name"
				value={values.name} 
				onChange={handleOnChange}
			/>
			<textarea 
				className="TextArea" 
				name="description" 
				value={values.description} 
				onChange={handleOnChange}
			/>
			<input 
				type="file" 
				className="FileUpload"
				name="image"
				onChange={updateImageInput}
			/>
			{switchButtons(context.state.isAdd)}
		</dialog>
	)
}