interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps): JSX.Element | null => {
  return message ? <div style={{ color: "red" }}>{message}</div> : null;
};

export default Notification;
