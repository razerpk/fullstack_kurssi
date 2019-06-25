import React from 'react';

const Person = (props) => {

  return (
    <div>
      {props.name} {props.phoneNumber}
    </div>
  )
}

export default Person