import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

import { GET_ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState();
  const [born, setBorn] = useState("");

  const result = useQuery(GET_ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: name.value, setBornTo: Number(born) },
    });

    setBorn("");
  };

  const authors = result.data.allAuthors;

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
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={setName}
            options={authors.map((a) => ({ value: a.name, label: a.name }))}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
