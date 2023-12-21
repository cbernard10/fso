import express from "express";
const app = express();
import qs from "qs";

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.use(express.json());

app.set("query parser", (str: string) => qs.parse(str, {}));

const allNumbers = (arr: Array<number>): boolean => {
  return arr.every((num) => !isNaN(num));
};

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const result: string = calculateBmi(Number(height), Number(weight));
  res.json({
    weight,
    height,
    bmi: result,
  });
});

app.post("/exercises", (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!allNumbers(daily_exercises) || isNaN(Number(target))) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);

  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
