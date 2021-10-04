import { DishesType, DialogType } from "./context";
import { UseFetch } from "./hooks/useFetch";
import { IDish } from "./types";

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
	  ? { type: Key	} : { type: Key, payload: M[Key] }
}

export enum Types {
	Add = 'ADD',
	Edit = 'EDIT',
	Fetch = 'FETCH'
}

type DialogPayload = {
	[Types.Add] : undefined
	[Types.Edit] : IDish
}

export type DialogActions = ActionMap<DialogPayload>[keyof ActionMap<DialogPayload>];

export const dialogReducer = (state: DialogType, action: DishActions | DialogActions) => {
	switch (action.type) {
	  case Types.Add:
		return {isOpen: !state.isOpen, currentDialogType: Types.Add, dish: {id: 0, name: '', description: '', image: []}}
	  case Types.Edit:
		return {isOpen: !state.isOpen, currentDialogType: Types.Edit, dish: action.payload}
	  default:
		return state;
	}
}

type DishPayload = {
	[Types.Fetch] : undefined
}

export type DishActions = ActionMap<DishPayload>[keyof ActionMap<DishPayload>];

export const dishReducer = (state: DishesType, action: DishActions | DialogActions) => {
	switch (action.type) {
	  case Types.Fetch:
		return state = UseFetch<IDish[]>(`${process.env.REACT_APP_MENU}/v1/dish`)
	  default:
		return state;
	}
}
