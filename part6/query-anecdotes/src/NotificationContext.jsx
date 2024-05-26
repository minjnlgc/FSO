import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "TIMEOUT":
      return "";
    case "ERROR":
      return action.payload;
    default:
      return "";
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useNotificationDispatcher = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};
