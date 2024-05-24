import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotificationWithTimeout,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(showNotificationWithTimeout(`you created '${content}'`), 5000);
  };

  return (
    <form onSubmit={handleAddAnecdote}>
      <input type="text" name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
