import express from 'express';
const app = express();

import { calculateBim } from './bmiCalculator';

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.json({
      error: 'malformatted parameters'
    })
  }
  res.send(calculateBim(height, weight));
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
