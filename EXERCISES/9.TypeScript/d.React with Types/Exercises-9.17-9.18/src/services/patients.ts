import axios from "axios"
import { Patient } from "../types"

const getPatients = (): Promise<Patient[]> => {
    return axios
           .get('http://localhost:3001/api/patients')
           .then(({data}) => data)
}

export default {getPatients}