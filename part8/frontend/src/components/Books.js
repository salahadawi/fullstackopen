import { useState } from "react";

import { useQuery } from "@apollo/client";

import { GET_ALL_BOOKS, GET_ALL_GENRES } from "../queries";

const Genres = ({ setShowGenre }) => {
  const { loading, error, data } = useQuery(GET_ALL_GENRES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const genres = data.allBooks
    .map((book) => book.genres)
    .reduce((acc, curr) => acc.concat(curr), [])
    .filter((genre, index, self) => self.indexOf(genre) === index);

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setShowGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setShowGenre("all")}>all genres</button>
    </div>
  );
};

const Books = (props) => {
  const [showGenre, setShowGenre] = useState("all");
  const result = useQuery(GET_ALL_BOOKS, {
    variables: { genre: showGenre === "all" ? null : showGenre },
    pollInterval: 500,
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Genres setShowGenre={setShowGenre} />
    </div>
  );
};

export default Books;
