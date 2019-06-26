import React from 'react';
import Person from './Person'

const Persons = ({personsToShow, deletePersonButton}) => {
  console.log('props :', personsToShow);
  const namesAndPhoneNumbers = () => personsToShow.map(person => 
    <Person 
    key={person.id} 
    name={person.name} 
    number={person.number} 
    deletePersonButton={() => deletePersonButton(2)}/>
  )

  return (
    <div>
      {namesAndPhoneNumbers()}
    </div>
  )
}

export default Persons