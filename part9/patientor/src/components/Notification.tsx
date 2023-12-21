import React from "react";

type Props = {
  message: { content: string; type: string };
};

function Notification({ message }: Props) {
  const style = {
    color: message.type === "success" ? "green" : "red",
    borderStyle: "solid",
    padding: "10px",
  };

  if (!message.content) return null;

  console.log("message", message);

  return <div style={style}>{message.content}</div>;
}

export default Notification;
