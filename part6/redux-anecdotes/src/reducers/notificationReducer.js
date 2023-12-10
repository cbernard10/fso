/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = "default message";

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
