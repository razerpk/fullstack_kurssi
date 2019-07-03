import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ showAll, setShowAll] = useState('')
  const [message, setMessage] = useState([null])

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
              setMessage(
                {
                  message: `Person '${found.name}' phonenumber has been changed to ${newPhoneNumber}`,
                  clas: 'change'
                }
              )
              setTimeout(() => {
                setMessage([null])
              }, 5000)
            })
            .catch(error => {
              setMessage(
                {
                  message: `The person ${found.name} was already deleted from server`,
                  clas: "delete"
                }
              )
              setPersons(persons.filter(person => person.name !== found.name))
              setTimeout(() => {
                setMessage([null])
              }, 5000)
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
            setMessage(
              {
                message: `Added ${newName}`,
                clas: `add`
              }
            )
            setTimeout(() => {
              setMessage([null])
            }, 5000)
        })
    }
  }

  const personExists = () => persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())  
    
  /* Deletes person from server */
  const deletePersonButton = (id, name) =>{
    personsService
      .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.name !== name))
          setMessage(
            {
              message: `Deleted ${name} succesfully`,
              clas: "delete",
            }
          )
          setTimeout(() => {
            setMessage([null])
          }, 5000)
        })
  } 

  /* Filters all persons who are not included */
  const personsToShow = showAll
  ? persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))
  : persons 

  /* Creates person statistic rows from persons array */
  const rows = () => {
    const namesAndPhoneNumbers = () => personsToShow.map(person => 
      <Person 
      key={person.id} 
      name={person.name} 
      number={person.number} 
      deletePersonButton={() => deletePersonButton(person.id, person.name)}/>
    )
    return (
      <div>
        {namesAndPhoneNumbers()}
      </div>
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message.message} clas={message.clas}/>
      <Filter showAll={showAll} handleFiltering={(event) => setShowAll(event.target.value)}/>

      <h1>add new</h1>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      newPhoneNumber={newPhoneNumber}
      handleNewNameChange={(event) => setNewName(event.target.value)}
      handleNewPhoneNumberChange={(event) => setNewPhoneNumber(event.target.value)}
      />

      <h2>Numbers</h2>
      
      <div>
        {rows()}
      </div>
    </div>
  )
}

export default App
