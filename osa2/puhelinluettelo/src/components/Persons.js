import React from 'react';
import Person from './Person'

const Persons = (props) => {
  const namesAndPhoneNumbers = () => props.personsToShow.map(person =>
    <Person key={person.name} name={person.name} number={person.number}/>
  )
  return (
    <div>
      {namesAndPhoneNumbers()}
    </div>
  )
}

export default Persons