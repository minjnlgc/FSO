import PropTypes from "prop-types";

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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
