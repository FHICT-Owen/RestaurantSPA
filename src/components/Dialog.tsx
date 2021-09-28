import {useState} from 'react';
import "./Dialog.css"

export default function Dialog() {

	let [toggle, onToggle] = useState(false)

	return (
		<>
			<button onClick={() => onToggle(toggle = !toggle)}>
			Add dish
			</button>
			<dialog className="Dialog" open={toggle}>
				<input className="Input"></input>
				<textarea className="TextArea"></textarea>
				<input className="FileUpload" type="file"></input>
			</dialog>
		</>
	)
}