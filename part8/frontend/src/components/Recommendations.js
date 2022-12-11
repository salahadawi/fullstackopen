import { useQuery } from "@apollo/client";

import { GET_ALL_BOOKS, ME } from "../queries";

const GetUser = () => {
  const { loading, error, data } = useQuery(ME, {
    pollInterval: 500,
  });

  if (loading) return null;
  if (error) return null;

  return data.me;
};

const GetGenreBooks = (user) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    skip: !user,
    variables: {
      genre: user
        ? user.favoriteGenre === "all"
          ? null
          : user.favoriteGenre
        : null,
    },
    pollInterval: 500,
  });

  if (!user) return null;
  if (loading) return null;
  if (error) return null;

  return data.allBooks;
};

const Recommendations = ({ show }) => {
  const user = GetUser();
  const books = GetGenreBooks(user);

  if (!show) {
    return null;
  }

  if (!user || !books) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
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
    </div>
  );
};

export default Recommendations;
