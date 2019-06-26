import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
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

  /* Add person into server */
  const addPerson = (event) => {
    event.preventDefault()
    if (personExists()){
      window.alert(`Phonebook already has ${newName}`)
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

  const personExists = () => persons.some((person) => person.name === newName)

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

  const personsToShow = showAll
  ? persons.filter((person) => person.name.toLowerCase().includes(showAll.toLowerCase()))
  : persons 

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
        <Persons personsToShow={personsToShow} deletePersonButton={() => deletePersonButton(2)} />
      </div>
    </div>
  )
}

export default App
