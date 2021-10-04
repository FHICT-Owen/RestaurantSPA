import { Dispatch, createContext, useReducer, FC } from "react";
import { UseFetch } from "./hooks/useFetch";
import { DialogActions, DishActions, Types, dialogReducer, dishReducer } from "./reducers"
import { IDish } from "./types";

export type DishesType = {
	data: IDish[] | null
	loading: boolean
}

export type DialogType = {
	isOpen: boolean
	currentDialogType: Types
	dish: IDish
}

export type InitialStateType = {
	dishes: DishesType
	dialog: DialogType
}

const initialState: InitialStateType = {
	dishes: {
		data: null,
		loading: false
	},
	dialog: {
		isOpen: false,
		currentDialogType: Types.Add,
		dish: {id: 0, name: '', description: '', image: []}
	}
}

const AppContext = createContext<{
	state: InitialStateType, 
	dispatch: Dispatch<DishActions | DialogActions>
}>({
	state: initialState,
	dispatch: () => null
})

const mainReducer = ({ dishes, dialog }: InitialStateType, action: DishActions | DialogActions) => ({
	dishes: dishReducer(dishes, action),
	dialog: dialogReducer(dialog, action)
})

const AppProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(mainReducer, initialState);
	state.dishes = UseFetch<IDish[]>(`${process.env.REACT_APP_MENU}/v1/dish`)
  
	return (
	  <AppContext.Provider value={{state, dispatch}}>
		{children}
	  </AppContext.Provider>
	)
}
  
export { AppProvider, AppContext }