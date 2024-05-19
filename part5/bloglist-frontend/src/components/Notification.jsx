const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const styleClass =
    message.includes("fail") ||
    message.includes("error") ||
    message.includes("invalid")
      ? "fail"
      : "success";

  return <div className={styleClass}>{message}</div>;
};

export default Notification;
