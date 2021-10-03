import { useEffect, useState } from "react";
import axios from "axios";


export function useFetch<T>(url: string) {
	const [state, setState] = useState<{data: T | null, loading: boolean}>({ data: null, loading: true})

	useEffect(() => {
		setState({data: null, loading: true})
		axios.get(url)
			.then((result) => setState({ data: result.data, loading: false}))
			.catch(() => setState({ data: null, loading: false}))
	}, [])

	return state
}