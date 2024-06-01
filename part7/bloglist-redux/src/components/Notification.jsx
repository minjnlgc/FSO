import { useSelector } from 'react-redux';

const Notification = () => {

  const notificationMsg = useSelector((state) => state.notification)

  console.log(notificationMsg);

  const styleClass =
  notificationMsg.toLowerCase().includes("fail") ||
  notificationMsg.toLowerCase().includes("error") ||
  notificationMsg.toLowerCase().includes("invalid")
      ? "fail"
      : "success";

  return notificationMsg && <div className={styleClass}>{notificationMsg}</div>;
};

export default Notification;
