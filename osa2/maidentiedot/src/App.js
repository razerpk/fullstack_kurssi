import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Country from './components/Country'
import countriesServices from './services/countries'

function App() {
  const [ weather, setWeather] = useState([])
  const [ countries, setCountries] = useState([])
  const [ showAll, setShowAll] = useState('')

  useEffect(() => {
    countriesServices
      .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
        })
  }, [])

  useEffect(() => {
    countriesServices
      .getAllWeather()
        .then(InitialCountryWeather => {
          setWeather(InitialCountryWeather)
        })
  }, [])
  
  const countryInfos = () => {
    if(countriesToShow.length > 10) {
      return <div>Too many matches, specify filter</div>
    }
    else if(countriesToShow.length > 1 && countriesToShow.length <= 10) {
      const show = () => countriesToShow.map(country => {
        return (
        <Countrybutton
        key={country.name} 
        name={country.name} 
        showCountryInformation={() => setShowAll(country.name)} 
        />  
        )
      })
      return (show())
    }else {
      const show = () => countriesToShow.map(country => {
        const countryLanguages = () => country.languages.map(language => 
          <Language key={language.iso639_1} name={language.name}/>
          )  
          return (
            <div key={country.name}>
              <Country 
              key={country.numericCode} 
              name={country.name} 
              capital={country.capital}
              population={country.population}
              countryLanguages={countryLanguages()}
              flag={country.flag}
              temp={weather.current.temp_c}
              />
            </div>
          )      
      })
      return show()
    }
  }  

  const countriesToShow = showAll
  ? countries.filter((country) => country.name.toLowerCase().includes(showAll.toLowerCase()))
  : countries

  return (
    <div>
      <div>
        Find countries:
        <input
        value={showAll} 
        onChange={(event) => setShowAll(event.target.value)}
        />
      </div>

      <div>
        {countryInfos()}
      </div>
    </div>
  )
}

const Countrybutton = (props) => {
  return (
    <div>
    {props.name}
    <button onClick={props.showCountryInformation}>show</button>   
    </div>   
    )
}

const Language = ({name}) => <li>{name}</li>

export default App;
