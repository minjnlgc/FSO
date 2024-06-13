import { CoursePart } from "../utils";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps): JSX.Element => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>
            <i>{coursePart.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>project exercise {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>submit to {coursePart.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>required skills: {coursePart.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
