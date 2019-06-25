import React from 'react';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>name:
        <input 
          value={props.newName} 
          onChange={props.handleNewNameChange}
        />
      </div>
      <div>number:
        <input 
          value={props.newPhoneNumber} 
          onChange={props.handleNewPhoneNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm