const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const classToUse =
    message.includes("removed") || message.includes("failed")
      ? "fail"
      : "success";

  return <div className={classToUse}>{message}</div>;
};

export default Notification;
