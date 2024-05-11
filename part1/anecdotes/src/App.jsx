import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Button = ({ handleOnClick, text }) => {
  return <button onClick={handleOnClick}>{text}</button>;
};

const Display = ({ anecdotes, selected, isMostVote, points }) => {
  if (isMostVote) {
    const mostVoteIdx = points.indexOf(Math.max(...points));

    return (
      <>
        <p>{anecdotes[mostVoteIdx]}</p>
        <p>has {Math.max(...points)} votes</p>
      </>
    );
  }

  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleNextClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const updatedPoints = [...points];
    updatedPoints[selected] += 1;

    setPoints(updatedPoints);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display
        anecdotes={anecdotes}
        selected={selected}
        isMostVote={false}
        points={points}
      />
      <Button handleOnClick={handleVote} text={"vote"} />
      <Button handleOnClick={handleNextClick} text={"next anecdote"} />
      <Header text="Anecdote with most votes" />
      <Display
        anecdotes={anecdotes}
        selected={selected}
        isMostVote={true}
        points={points}
      />
    </div>
  );
};

export default App;
