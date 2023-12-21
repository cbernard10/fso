import axios from "axios";

import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data: diagnoses } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses/`
  );
  return diagnoses;
};

const getOne = async (code: string) => {
  try {
    const { data: diagnosis } = await axios.get<Diagnosis>(
      `${apiBaseUrl}/diagnoses/${code}`
    );
    return diagnosis;
  } catch (e) {
    const err = e as Error;
    throw new Error(`Error fetching diagnosis: ${err.message}`);
  }
};

const addEntry = async (entry: Diagnosis) => {
  try {
    const { data: newEntry } = await axios.post<Diagnosis>(
      `${apiBaseUrl}/diagnoses`,
      entry
    );

    return newEntry;
  } catch (e) {
    const err = e as Error;
    throw new Error(`Error adding diagnosis: ${err.message}`);
  }
};

export default {
  getAll,
  getOne,
  addEntry,
};
