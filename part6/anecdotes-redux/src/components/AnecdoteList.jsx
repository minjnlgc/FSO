import { useDispatch, useSelector } from "react-redux";
import { updateAnecdoteVote } from "../reducers/anecdoteReducer";
import { useMemo } from "react";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const sortedAnecdotes = useMemo(() => {
    return [...anecdotes].sort((a, b) => b.votes - a.votes);
  }, [anecdotes]);

  const dispatch = useDispatch();

  const handleVote = (a) => {
    dispatch(showNotificationWithTimeout(`you voted '${a.content}'`, 5000));
    dispatch(updateAnecdoteVote(a.id));
  };

  return (
    <div>
      {sortedAnecdotes.map((a) => {
        return (
          <div key={a.id}>
            <p>{a.content}</p>
            <p>
              has {a.votes}
              <button onClick={() => handleVote(a)}>vote</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AnecdoteList;
