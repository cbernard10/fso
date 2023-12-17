import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

function Recommendations({ show }) {
  if (!show) {
    return null;
  }

  const result = useQuery(ME);
  const allBooks = useQuery(ALL_BOOKS);

  if (result.loading || allBooks.loading) {
    return <div>loading...</div>;
  }

  //   useEffect(() => {
  //     if (result.data) {
  //       console.log(result.data.me.favoriteGenre);
  //       console.log(allBooks.data.allBooks.map((book) => book.genres));
  //     }
  //   });

  return (
    result.data.me && (
      <div>
        <h2>recommendations</h2>
        books in your favorite genre{" "}
        <strong>{result.data.me.favoriteGenre}</strong>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {allBooks.data.allBooks.map(
              (book) =>
                book.genres.includes(result.data.me.favoriteGenre) && (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Recommendations;
