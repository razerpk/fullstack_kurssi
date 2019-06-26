import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll] = useState('')

  /* fetching all data of persons from server */
  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  /* Change existing persons number or add person into server*/
  const addPerson = (event) => {
    event.preventDefault()
    const found = personExists()
    if (found !== undefined){
      const updateNumber = window.confirm(`Phonebook already has ${newName}. Do you want to replace the old number with a new one?`)
      if(updateNumber){
        const changedPerson = { ...found, number: newPhoneNumber}
        personsService
          .update(found.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => found.id !== person.id ? person : returnedPerson))
            })
      }
    }else {
      const nameObject = {
        name: newName,
        number: newPhoneNumber,
      }
      personsService
        .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewPhoneNumber('')
        })
    }
  }

  const personExists = () => persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

  /* Deletes person from server */
  const deletePersonButton = (id) =>{
    personsService
      .deletePerson(id)
        .then(deletedObject => {
          setPersons(persons.map(person => person.id !== id ? person : deletedObject))
      })
  } 

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewPhoneNumberChange = (event) => setNewPhoneNumber(event.target.value)
  const handleFiltering = (event) => setShowAll(event.target.value)

  /* Filters all persons who are not included */
  const personsToShow = showAll
  ? persons.filter((person) => person.name.toLowerCase().includes(showAll.toLowerCase()))
  : persons 

  /* Creates person statistic rows from persons array */
  const Persons = () => {
    const namesAndPhoneNumbers = () => personsToShow.map(person => 
      <Person 
      key={person.id} 
      name={person.name} 
      number={person.number} 
      deletePersonButton={() => deletePersonButton(person.id)}/>
    )
    return (
      <div>
        {namesAndPhoneNumbers()}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter showAll={showAll} handleFiltering={handleFiltering}/>

      <h1>add new</h1>

      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      newPhoneNumber={newPhoneNumber}
      handleNewNameChange={handleNewNameChange}
      handleNewPhoneNumberChange={handleNewPhoneNumberChange}
      />

      <h2>Numbers</h2>
      
      <div>
        {Persons()}
      </div>
    </div>
  )
}


export default App
