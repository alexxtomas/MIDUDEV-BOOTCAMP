import axios from "axios"
import { useEffect, useState } from "react"
import Filter from "./Components/Filter"
import Content from "./Components/Content"

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setAllCountries(response.data))
  }, [])

 
  const eventHandlerChange = event => {
    setNewFilter(event.target.value)
    if(newFilter) {
      const filtredCountries = () => allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      setCountries(filtredCountries) 
    }
  }
  
  return (
    <>
      <Filter onChange={eventHandlerChange} value={newFilter} />
      <Content setCountries={setCountries} countries={countries} />
    </>
  )
}


export default App