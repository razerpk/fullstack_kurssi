import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (personExists()){
      window.alert(`Phonebook already has ${newName}`)
    }else {
      const nameObject = {
        name: newName,
        number: newPhoneNumber,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhoneNumber('')
    }
  }

  const personExists = () => persons.some((person) => person.name === newName)
  
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
        <Persons personsToShow={personsToShow}/>
      </div>
    </div>
  )
}

export default App
