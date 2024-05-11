const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };
  
  const Total = ({ sum }) => {
    return (
      <p>
        <b>Number of exercises {sum}</b>
      </p>
    );
  };
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    return parts.map((part) => {
      return <Part key={part.id} name={part.name} exercises={part.exercises} />;
    });
  };
  
  const Course = ({ course }) => {
    const totalExercise = course.parts.reduce((acc, n) => {
      return acc + n.exercises;
    }, 0);
  
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={totalExercise} />
      </>
    );
  };


export default Course;