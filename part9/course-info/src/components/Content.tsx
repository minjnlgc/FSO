import { CoursePart } from "../utils";
import Part from "./Part";

interface CoursePartsProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: CoursePartsProps): JSX.Element => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part coursePart={part} />
      ))}
    </div>
  );
};

export default Content;
