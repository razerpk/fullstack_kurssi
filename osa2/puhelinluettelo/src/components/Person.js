import React from 'react';

const Person = ({ name, number, deletePersonButton}) => {
  const areYouSure = () => {
    if (window.confirm(`Do you really want to delete ${name}`))
      {deletePersonButton()}
  }
  return (
    <div>
      {name} {number} 
      <button onClick={areYouSure}>delete</button>
    </div>
  )
}

export default Person