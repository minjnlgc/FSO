import { useSelector } from 'react-redux';

const Notification = () => {

  const notificationMsg = useSelector((state) => state.notification)

  console.log(notificationMsg);

  const styleClass =
  notificationMsg.includes("fail") ||
  notificationMsg.includes("error") ||
  notificationMsg.includes("invalid")
      ? "fail"
      : "success";

  return notificationMsg && <div className={styleClass}>{notificationMsg}</div>;
};

export default Notification;
