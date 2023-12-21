import axios from "axios";

import { DiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiary = async (entry: DiaryEntry) => {
  let response;
  try {
    response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw new Error(error.response?.data);
    }
    // console.log(error);
    throw new Error("Something went wrong");
  }
};
