import express from "express";
const app = express();

import { calculateBim } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.json({
      error: "malformatted parameters",
    });
  }
  return res.send(calculateBim(height, weight));
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (
    !daily_exercises ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((e: any) => isNaN(Number(e))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
