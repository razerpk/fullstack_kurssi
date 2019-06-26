import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [ countries, setCountries] = useState([])
  const [ showAll, setShowAll] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        console.log('data', response.data)
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => setShowAll(event.target.value) 

  const countryInfos = () => {
    if(countriesToShow.length > 10)
      return <div>Too many matches, specify filter</div>
    else{
      const show = () => countriesToShow.map(country => {
        if(countriesToShow.length > 1 && countriesToShow.length < 10){
          return (
          <div key={country.name}> {country.name} <button>show</button></div>       
          )
        }else{
          const countryLanguages = () => country.languages.map(language => 
          <Language key={language.iso639_1} name={language.name}/>
          )

          return (
            <div key={country.numericCode}>
              <Country 
              key={country.numericCode} 
              name={country.name} 
              capital={country.capital}
              population={country.population}
              flag={country.flag}
              />

              <h3>languages</h3>
              <ul>
                {countryLanguages()}
              </ul>
              <img src={country.flag} alt='flag' width='30%' height='30%'></img>
            </div>
          )
        }
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
        onChange={handleInputChange}
        />
      </div>

      <div>
        {countryInfos()}
      </div>
    </div>
  )
}

const Country = (props) => {
  return (
  <div>
    <h1>{props.name}</h1>
    <div>Capital {props.capital}</div>
    <div>Population {props.population}</div>
  </div>
  )
}
const Language = ({name}) => <li>{name}</li>

export default App;
