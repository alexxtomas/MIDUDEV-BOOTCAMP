import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from './reducer';

export type State = {
    patients: {[id: string]: Patient}
}

const intialState: State = {
    patients: {}
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
    intialState,
    () => intialState
])

type StateProviderProps = {
    reducer: React.Reducer<State, Action>,
    children: React.ReactElement
}

export const StateProvider: React.FC<StateProviderProps> = ({reducer, children}: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, intialState)
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)