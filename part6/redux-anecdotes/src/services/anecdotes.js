import axios from "axios";

const baseUrl = "http://localhost:3002/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNewAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id) => {
  console.log("entered vote fn, id:", id);
  const anecdotes = await getAll();
  const anecdote = anecdotes.find((n) => n.id === id);
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };

  console.log("changedAnecdote", changedAnecdote);

  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  return response.data;
};

export default { getAll, createNewAnecdote, vote };
