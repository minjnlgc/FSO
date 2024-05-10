import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercise}
      </p>
    </>
  )
}

const Content = (props) => {

  return (
    <>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercise}/>
      <Part name={props.parts[1].name} exercise={props.parts[1].exercise}/>
      <Part name={props.parts[2].name} exercise={props.parts[2].exercise}/>
    </>
  )
}


const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise} </p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },  
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/> 
    </>
  )
}

export default App