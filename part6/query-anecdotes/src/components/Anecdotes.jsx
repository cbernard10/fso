import React from "react";

import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { voteAnecdote, createAnecdote } from "../requests";
import NotificationContext from "./NotificationContext";
import { useNotificationDispatch } from "./NotificationContext";

function Anecdotes() {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const getAnecdotes = () =>
    axios.get("http://localhost:3001/anecdotes").then((res) => res.data);

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });


  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      data: `anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const anecdotes = result.data;

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
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
}

export default Anecdotes;
