import React from "react";
import { gql, useQuery } from "@apollo/client";

import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries";
import { useState } from "react";

import BirthyearForm from "./BirthyearForm";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const [authors, setAuthors] = useState([]);

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm />
    </div>
  );
};

export default Authors;
