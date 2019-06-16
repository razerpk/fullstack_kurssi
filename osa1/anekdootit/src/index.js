import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  
  const array = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0)
  const [selected, setSelected] = useState(0)  
  const [points, setPoints] = useState(array)
  
  const handleSelectedClick = () => {
    let rn = Math.floor(Math.random() * props.anecdotes.length)
    while(rn === selected)
      rn = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(rn)
  }

  const handleVotedClick = () => {  
    const temp = [...points]
    temp[selected] += 1 
    setPoints(temp)     
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}
      </p>
        Has {points[selected]} votes
      <p>
        <Button handleClick={handleVotedClick} text='vote'/>
        <Button handleClick={handleSelectedClick} text='next adecdote'/>
      </p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
/* initializing array with 0's and as long as anecdotes*/ 

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
