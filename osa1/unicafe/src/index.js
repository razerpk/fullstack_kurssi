import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick} >
    {text}
  </button>
)
const Statistics = (props) => {

  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value ={props.good} />
        <Statistic text="neutral" value ={props.neutral} />
        <Statistic text="bad" value ={props.bad} />
        <tr>
          <td>all</td>
          <td>{props.good+ props.neutral + props.bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(props.good + (props.bad*-1))/ (props.good+ props.neutral + props.bad)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(props.good/ (props.good+ props.neutral + props.bad))*100} %</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistic = (props) => {
  return (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
  )
}

const App = () => {
  // each button has own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handlebadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handlebadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
