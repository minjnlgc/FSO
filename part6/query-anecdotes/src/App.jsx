import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdoteVote } from "./requests";
import { useNotificationDispatcher } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatcher();

  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdoteVote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const newAnecdotes = anecdotes.map((a) =>
        a.id === newAnecdote.id ? newAnecdote : a
      );
      queryClient.setQueryData(["anecdotes"], newAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    updateVoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch({
      type: "ERROR",
      payload: `anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({ type: "TIMEOUT" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.error) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data ? result.data : [];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
