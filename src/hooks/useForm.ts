import { useState } from "react";

export function useForm<T>(input: T): [T, React.ChangeEventHandler<any> | undefined] {
	const [values, setValues] = useState(input)
	
	return [
		values,
		e => {
			console.log(e.target.value)
			setValues({
				...values,
				[e.target.name]: e.target.value
			})
		}
	]
}