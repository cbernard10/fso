type Props = {
  message: {
    type: string;
    content: string;
  };
};

function Notification({ message }: Props) {
  const type = message.type;
  if (message === null) {
    return null;
  }

  return (
    <div style={type === "error" ? { color: "red" } : { color: "green" }}>
      {message.content}
    </div>
  );
}

export default Notification;
