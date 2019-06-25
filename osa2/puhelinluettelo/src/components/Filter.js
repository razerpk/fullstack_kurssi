import React from 'react';

const Filter = (props) => {
  return (
    <div>
      filter:
      <input 
        value={props.showAll} 
        onChange={props.handleFiltering}
      />
    </div>
  )
}

export default Filter