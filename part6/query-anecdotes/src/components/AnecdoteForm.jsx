import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdotes } from "../requests";
import { useNotificationDispatcher } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatcher();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({
        type: "ERROR",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        dispatch({ type: "TIMEOUT" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      {
        content: content,
        votes: 0,
      }
    );
    console.log("new anecdote");

    dispatch({ type: "SHOW", payload: `created anecdote '${content}'` });
    setTimeout(() => {
      dispatch({ type: "TIMEOUT" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
