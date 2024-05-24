import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useMemo } from "react";

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
    return [...anecdotes].sort((a, b) => b.vote - a.vote);
  }, [anecdotes]);

  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {sortedAnecdotes.map((a) => {
        return (
          <div key={a.id}>
            <p>{a.content}</p>
            <p>
              has {a.vote}
              <button onClick={() => handleVote(a.id)}>vote</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AnecdoteList;
