import patients from "../../data/patients-full";
import { v1 as uuid } from "uuid";

import { NonSentitivePatient, NewPatient, Patient } from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSentitiveEntries = (): NonSentitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newID = uuid();
  console.log(newID);
  const newPatient = {
    id: newID,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSentitiveEntries,
  addPatient,
};
