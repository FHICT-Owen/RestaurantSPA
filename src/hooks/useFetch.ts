import { useEffect, useRef, useState } from "react";
import axios from "axios";

export function useFetch<T>(url: string) {
	const [state, setState] = useState<{data: T | null, loading: boolean}>({ data: null, loading: true})
	const stateRef = useRef(() => {})

	stateRef.current = () => {
		axios.get(url)
			.then(result => setState({ data: result.data, loading: false}))
			.catch(() => setState({ data: null, loading: false}))
	}

	useEffect(() => {
		stateRef.current()
	}, [])

	return state
}