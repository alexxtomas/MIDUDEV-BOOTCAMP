import { useEffect, useState } from "react"

const Content = ({setCountries, countries}) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-17.53&lon=-149.56&units=metric&appid=845a8c38e0b3868aaf346406e1360846')
        
            .then(res => res.json())
            .then(json => setWeather(json))
    }, [])
    
    if ((countries.length > 1 && countries.length < 10) || (countries.length === 0)) {
        return (
            <ul>
               {countries.map((country, i) =>
                    <li key={i}> {country.name.common} <button onClick={() => setCountries([country])}>Show</button></li>
          )}    
            </ul>
        )
    }
    else if (countries.length === 1) {
        const img = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
        return (
            <div>
                {countries.map((country, i) => {
                    const languages = Object.values(country.languages)
                    return (
                        <div key={i}>
                            <h1>{country.name.common}</h1>
                            <p>Capital: {country.capital}</p>
                            <p>Area: {country.area}</p>
                            <p><strong>Languages: </strong></p>
                            <ul>
                                {languages.map((langauge, i) => <li key={i}>{langauge}</li>)}
                            </ul>
                            <img src={country.flags.png} alt='Country Flag' />
                            <h2>Weather in {country.capital}</h2>
                            <p>Temperature {weather.current.temp} Celcius</p>
                            <img src={img} alt="Weather Icon"/>
                            <p>Wind {weather.current.wind_speed} km/h</p>
                            
                        </div>
                    )
                })}
            </div>
        )
    }
    else if (countries.length >= 10) {
        console.log(countries.length)
        return <p>Too many matches, specify another countries</p>
    } 
}

export default Content