import { useNotificationValue } from "../NotificationContext"

const Notification = () => {

  const message = useNotificationValue()

  const style = {
    border: "solid",
    padding: 10,
    margin: 15,
    borderWidth: 1.5,
    borderRadius: 10,
    color: "purple",
  };

  return message && <div style={style}>{message}</div>
}

export default Notification
