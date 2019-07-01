import React from 'react'

const Country = (props) => {
  return (
  <div>
    <h1>{props.name}</h1>
    <div>Capital {props.capital}</div>
    <div>Population {props.population}</div>
    <h3>languages</h3>
    <ul>
      {props.countryLanguages}
    </ul>

    <img src={props.flag} alt='flag' width='30%' height='30%'></img>
    
    <h3>Weather in {props.capital}</h3>
    <div>
      <b>temperature: </b>
      {props.temp} Celsius
    </div>
  </div>
  )
}

export default Country