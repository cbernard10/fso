import { Patient, PatientFormValues, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";
import axios from "axios";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const addEntry = async (object: EntryWithoutId, patientId: string) => {
  console.log("adding entry", object);
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      object
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
};

export default {
  getAll,
  create,
  getOne,
  addEntry,
};
