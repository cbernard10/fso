/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return "";

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  return notificationDispatch;
};

export default NotificationContext;
