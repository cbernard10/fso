import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
