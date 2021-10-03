import { createContext, useContext, useReducer } from "react";
// import { IDish } from "../types";

type Action = {type: 'add'} | {type: 'edit'}
type Dispatch = (action: Action) => void
type State = {isOpen: boolean, isAdd: boolean}
type ToggleProviderProps = {children: React.ReactNode}

// function init(dish: IDish) {
// 	return {dish: dish};
// }

const ToggleStateContext = createContext<{state: State, dispatch: Dispatch} | undefined>(undefined)

function toggleReducer(state: State, action: Action) {
	switch (action.type) {
		case 'add': {
			return {isOpen: !state.isOpen, isAdd: true}
		}
		case 'edit': {
			return {isOpen: !state.isOpen, isAdd: false}
		}
	}
}

const initialState = {isOpen: false, isAdd: true};

function ToggleProvider({children}: ToggleProviderProps) {
	const [state, dispatch] = useReducer(toggleReducer, initialState)
	const value = {state, dispatch}

	return <ToggleStateContext.Provider value={value}>{children}</ToggleStateContext.Provider>
}

function useToggle() {
	const context = useContext(ToggleStateContext)
	if (context === undefined) {
	  throw new Error('useCount must be used within a CountProvider')
	}
	return context
}
  
export {ToggleProvider, useToggle}