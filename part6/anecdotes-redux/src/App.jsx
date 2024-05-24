import "./App.css";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import SearchFilter from "./components/SearchFilter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <SearchFilter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
}

export default App;
