import { useContext, useEffect } from 'react'
import { AppContext } from '../context';
import { useForm } from '../hooks/useForm';
import { IDish } from "../types"
import axios from 'axios'
import "./Dialog.css"
import { Types } from '../reducers';
import { convertFileToNumberArray } from '../utils';

export default function Dialog() {

	const [values, handleOnChange] = useForm<{
		name: string, 
		description: string, 
		image: File
	}>({name: '', description: '', image: File.prototype})

	const { state } = useContext(AppContext);

	let dish: IDish = {id: 0, name: "", description: "", image: []}

	useEffect(() => {
		console.log('render')
	}, [state.dialog.isOpen])

	function switchButtons(showAdd: Types) {
		if (showAdd === Types.Add) {
			return <button onClick={
				async () => {
					const image = await convertFileToNumberArray(values.image)
					dish = {id: 0, name: values.name, description: values.description, image: image}
					await axios.post(`${process.env.REACT_APP_MENU}/v1/dish/`, dish)
					// dispatch({type: Types.Fetch})
				}
			}>Add</button>
		} else {

			/////
			///// TODO: make sure that the dialog rerenders and input values are set correctly
			/////  (useEffect) might work

			dish.id = state.dialog.dish.id
			dish.name = values.name
			dish.description = values.description
			return <button onClick={
				async () => {
					const image = await convertFileToNumberArray(values.image)
					dish.image = image
					await axios.put(`${process.env.REACT_APP_MENU}/v1/dish/${state.dialog.dish.id}`, dish)
				}
			}>Edit</button>
		}
	}

	return (
		<dialog className="Dialog" open={state.dialog.isOpen}>
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
				onChange={handleOnChange}
			/>
			{switchButtons(state.dialog.currentDialogType)}
		</dialog>
	)
}