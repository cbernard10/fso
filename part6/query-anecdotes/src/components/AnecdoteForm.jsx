import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const generateId = () => Number((Math.random() * 1000000).toFixed(0));

  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: (axiosObj) => {
      // not sure how to call that thing
      const errMessage = axiosObj.response.data.error;
      console.log(errMessage);

      notificationDispatch({
        type: "SET_NOTIFICATION",
        data: errMessage,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({
      content: anecdote,
      votes: 0,
      id: `${generateId()}`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreateAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
