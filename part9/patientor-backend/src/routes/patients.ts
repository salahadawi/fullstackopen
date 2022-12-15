/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatientEntry = patientService.addEntry(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(newPatientEntry);
});

export default router;
