import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({name, exercise}) => {
  return (
    <>
      <p>
        {name} {exercise}
      </p>
    </>
  );
};

const Content = ({name, parts}) => {
  return (
    <>
      {parts.map((e, i) => {
        return <Part name={e.name} exercise={e.exercise} key={i} />;
      })}
    </>
  );
};

const Total = ({name, parts}) => {

  const exerciseTotal = parts.reduce((acc, e) => {
    return acc + e.exercise;
  }, 0)

  return (
    <>
      <p>
        Number of exercises {exerciseTotal}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;