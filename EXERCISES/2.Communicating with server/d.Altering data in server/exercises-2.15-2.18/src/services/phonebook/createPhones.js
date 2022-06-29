import axios from "axios"

export const createPhones = ({name}, {number}) => {
    return axios.post('http://localhost:3001/api/persons', {name, number})
                .catch(err => console.log(err))
            
} 