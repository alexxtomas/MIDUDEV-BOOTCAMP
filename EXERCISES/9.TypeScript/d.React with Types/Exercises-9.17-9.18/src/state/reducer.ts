import { memo } from 'react'
import { Patient } from '../types'
import { State } from './state'

export type Action = 
    | {
        type: 'SET_PATIENTS',
        payload: Patient[]
    }
    | {
        type: 'ADD_PATIENT',
        payload: Patient
    }




export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENTS':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({...memo, [patient.id]: patient}), {}
                    ),
                    ...state.patients
                }
            }
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            }
            
    
        default:
            return state
    }
}


export const setPatients = (patients: Patient[]): Action => {
    return {
        type: 'SET_PATIENTS',
        payload: patients
    }
}
