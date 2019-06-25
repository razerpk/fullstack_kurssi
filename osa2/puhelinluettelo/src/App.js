import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '045-9191598'},
    { name: 'Pekka Pouta', phoneNumber: '39-236-423122' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (personExists()){
      window.alert(`Phonebook already has ${newName}`)
    }else {
      const nameObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
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
