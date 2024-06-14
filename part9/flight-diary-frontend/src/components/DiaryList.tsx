import { Diary } from "../types";

interface DiaryListProps {
  diaries: Diary[];
}

const DiaryList = ({ diaries }: DiaryListProps): JSX.Element => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <p>visibility: {d.visibility}</p>
            <p>weather: {d.weather}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryList;
