import express from "express";

import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello World!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    res.send({
      error: "malformatted parameters",
    });
  } else {
    try {
      const result = bmiCalculator(String(height), String(weight));
      res.send({
        weight,
        height,
        bmi: result,
      });
    } catch (e) {
      res.send({
        error: "malformatted parameters",
      });
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.send({
      error: "parameters missing",
    });
  } else {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = exerciseCalculator(daily_exercises, target);
      res.send(result);
    } catch (e) {
      res.send({
        error: "malformatted parameters",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
