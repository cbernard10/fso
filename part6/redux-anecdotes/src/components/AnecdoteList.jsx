/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
// import {
//   removeNotification,
// } from "../reducers/notificationReducer";

import { voteAnecdote } from "../reducers/anecdoteReducer";

import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(state.filter);
    });
  });

  // const handleVote = async (anecdote) => {
  //   dispatch(voteId(anecdote));
  //   dispatch(setNotification(`You voted '${anecdote.content}'`));
  //   setTimeout(() => {
  //     dispatch(removeNotification());
  //   }, 5000);
  // };

  const handleVote = async (anecdote) => {
    console.log("entered handleVote", anecdote);
    dispatch(voteAnecdote(anecdote));

    dispatch(setNotification(`You voted '${anecdote.content}'`, 2));

    // dispatch(setNotification(`You voted '${anecdote.content}'`));

    // dispatch(setNotification(`You voted '${anecdote.content}'`));
    // setTimeout(() => {
    //   dispatch(removeNotification());
    // }, 5000);
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
          />
        ))}
    </div>
  );
};

export default Anecdotes;
