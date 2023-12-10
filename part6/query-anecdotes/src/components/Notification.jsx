import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import { useNotification } from "./NotificationContext";

const Notification = () => {
  // const [notification, notificationDispatch] = useContext(NotificationContext);

  const notification = useNotification();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  // if (true) return null

  return (notification && <div style={style}>{notification}</div>);
};

export default Notification;
