import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { courseParts } from "./utils";

const App = () => {
  const courseName: string = "Half Stack application development";
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <br />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
