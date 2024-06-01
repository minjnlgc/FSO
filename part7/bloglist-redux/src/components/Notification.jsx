import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Notification = () => {

  const notificationMsg = useSelector((state) => state.notification)

  console.log(notificationMsg);

  const variant =
  notificationMsg.toLowerCase().includes("fail") ||
  notificationMsg.toLowerCase().includes("error") ||
  notificationMsg.toLowerCase().includes("invalid")
      ? "danger"
      : "success";

  return notificationMsg && <Alert variant={variant} className='mt-3'>{notificationMsg}</Alert>;
};

export default Notification;
