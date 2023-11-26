import { useState } from "react";

const Total = ({ good, neutral, bad }) => <p>all {good + neutral + bad}</p>;
const Average = ({ good, neutral, bad }) => (
  <p>average {(good - bad) / (good + neutral + bad)}</p>
);
const Positive = ({ good, neutral, bad }) => (
  <p>positive {(good / (good + neutral + bad)) * 100} %</p>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = (good, neutral, bad) => good + neutral + bad;
  const average = (good, neutral, bad) => (good - bad) / (good + neutral + bad);
  const positive = (good, neutral, bad) =>
    `${(good / (good + neutral + bad)) * 100}%`;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        {good + neutral + bad > 0 ? (
          <>
            <StatisticLine text="total" value={total(good, neutral, bad)} />
            <StatisticLine text="average" value={average(good, neutral, bad)} />
            <StatisticLine
              text="positive"
              value={positive(good, neutral, bad)}
            />
          </>
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} label="good" />
        <Button onClick={() => setNeutral(neutral + 1)} label="neutral" />
        <Button onClick={() => setBad(bad + 1)} label="bad" />
      </div>
      <h1>Statistics</h1>
      <Statistics {...{ good, neutral, bad }} />
    </div>
  );
};

export default App;
