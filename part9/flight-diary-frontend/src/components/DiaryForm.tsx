import { useState } from "react";
import { createDiary } from "../services/diaryService";
import Notification from "./Notification";
import axios from "axios";
import { Visibility, Weather } from "../types";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const DiaryForm = (): JSX.Element => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility | string>("");
  const [weather, setWeather] = useState<Weather | string>("");
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("click");

    createDiary({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (
          axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
        ) {
          console.log(error.response?.data);
          const errorMessage = error.response?.data;
          if (typeof errorMessage === "string") {
            setMessage(errorMessage);
            setTimeout(() => {
              setMessage("");
            }, 5000);
          } else {
            console.log("Unexpected error format", errorMessage);
          }
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={message} />
      <form onSubmit={handleSubmit}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:{" "}
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                value={visibility?.toString()}
                checked={visibility === value}
                name="visibility"
                onChange={() => setVisibility(value as Visibility)}
              />{" "}
            </label>
          ))}
        </div>
        <div>
          weather:{" "}
          {Object.values(Weather).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                value={weather?.toString()}
                checked={weather === value}
                name="weather"
                onChange={() => setWeather(value as Weather)}
              />{" "}
            </label>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
