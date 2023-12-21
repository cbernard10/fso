import { useEffect, useState } from "react";

import { getDiaries, addDiary } from "./diaryService";
import { DiaryEntry } from "./types";
import Notification from "./components/Notification";
import { Message } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<Message>({
    content: "",
    type: "",
  });

  useEffect(() => {
    getDiaries().then((res) => {
      setDiaries(res);
    });
  }, []);

  const createNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    };
    addDiary(newDiary)
      .then((res) => {
        setDiaries(diaries.concat(res));
      })
      .catch((err) => {
        setErrorMessage({
          content: err.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <form onSubmit={createNewDiary}>
        <div>
          date
          <input
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            type="date"
          />
        </div>
        <div>
          visibility
          {["great", "good", "ok", "poor"].map((visibility) => (
            <label key={visibility}>
              <input
                type="radio"
                value={visibility}
                name="visibility"
                onChange={(e) => setNewVisibility(e.target.value)}
              />
              {visibility}
            </label>
          ))}
        </div>
        <div>
          weather
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((weather) => (
            <label key={weather}>
              <input
                type="radio"
                value={weather}
                name="weather"
                onChange={(e) => setNewWeather(e.target.value)}
              />
              {weather}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h1>Diaries</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.date}>
            <div>
              <h3>{diary.date}</h3>
              <p>visibility: {diary.visibility}</p>
              <p>weather: {diary.weather}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
