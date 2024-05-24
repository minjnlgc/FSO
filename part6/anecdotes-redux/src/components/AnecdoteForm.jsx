import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
    dispatch(setNotification(`you created '${content}'`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <form onSubmit={handleAddAnecdote}>
      <input type="text" name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
