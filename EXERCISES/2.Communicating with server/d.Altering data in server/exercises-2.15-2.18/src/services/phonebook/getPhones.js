import axios from "axios"

export const getPhones = () => {
   return axios
        .get('http://localhost:3001/phonebook')
        .then(res => {
            const {data} = res
            return data
        })
}