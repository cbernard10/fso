import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteId(state, action) {
      console.log("state", state, "action", action);
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      console.log(action);
      return action.payload;
    },
  },
});

export const { voteId, addAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    console.log("fetching anecdotes")
    const anecdotes = await anecdoteService.getAll();
    console.log("ok")
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
}

export const voteAnecdote = (anecdote) => {
  console.log("entered voteAnecdote fn, anecdote:", anecdote);
  return async (dispatch) => {
    console.log("dispatching voteId")
    const response = await anecdoteService.vote(anecdote.id);
    console.log("response", response)
    dispatch(voteId(anecdote.id));
  };
}

export default anecdoteSlice.reducer;
