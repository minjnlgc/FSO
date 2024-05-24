import { useSelector } from "react-redux";

const Notification = () => {

const notification = useSelector(state => state.notification)

  const style = {
    border: "solid",
    padding: 10,
    margin: 15,
    borderWidth: 1.5,
    borderRadius: 10,
    color: "purple",
  };

  return notification && <div style={style}>{notification}</div>
};

export default Notification;
