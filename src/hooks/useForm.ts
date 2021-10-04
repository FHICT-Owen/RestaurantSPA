import { useState } from "react";

export function useForm<T>(input: T): [T, React.ChangeEventHandler<any> | undefined] {
	const [values, setValues] = useState(input)
	
	return [
		values,
		e => {
			if (e.target.type === 'file') {
				setValues({
					...values,
					[e.target.name]: e.target.files[0]
				})
			}
			else
				setValues({
					...values,
					[e.target.name]: e.target.value
				})
		}
	]
}