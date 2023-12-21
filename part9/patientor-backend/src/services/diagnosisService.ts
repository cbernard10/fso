import diagnoses from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = (diagnosis: Diagnosis): Diagnosis => {
  diagnoses.push(diagnosis);
  return diagnosis;
};

export default {
  getEntries,
  addDiagnosis,
};
