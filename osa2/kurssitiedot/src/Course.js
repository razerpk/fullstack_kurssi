import React from 'react'

/*All Course subcomponents in this file */
const Course = (props) => {
	return (
	<div>
		<Header course={props.name}/>
		<Content parts={props.parts}/>
		<Total parts={props.parts}/> 
	</div>
	)
}
const Header = props =>
  <h1>{props.course}</h1>


const Content = props => {
	const allParts = props.parts.map((part) => 
		<Part key={part.id} part={part} />   
	)
	return allParts
}
  
const Part = props => {
  return <p>{props.part.name} {props.part.exercises}</p>

}

const Total = props => {
	const total = props.parts.reduce((sum, task) => sum + task.exercises, 0)

  return <h3>Total of {total} tasks</h3>
}

export default Course
