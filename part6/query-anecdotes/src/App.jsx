import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import Anecdotes from "./components/Anecdotes";

const App = () => {



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <Anecdotes />

      {/* {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default App;
