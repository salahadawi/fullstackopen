import patientData from "../../data/patients.json";

import { Patient } from "../types";

const patients: Patient[] = patientData;

const getEntries = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
};
