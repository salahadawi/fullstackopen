import express from "express";

import { bmiCalculator } from "./bmiCalculator";

const app = express();

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
