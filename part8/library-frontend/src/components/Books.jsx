import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredBook, setFilteredBooks] = useState([]);
  const [currGenre, setCurrGenre] = useState("all genires");

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genres: currGenre === "all genres" ? null : currGenre },
  });

  useEffect(() => {
    if (data) {
      const fetchedBooks = data.allBooks;

      if (books.length === 0) {
        setBooks(fetchedBooks);
      }
      setFilteredBooks(fetchedBooks);

      if (fetchedBooks.length > 0) {
        const genresList = fetchedBooks.reduce((acc, b) => {
          return acc.concat(b.genres);
        }, []);

        setGenres([...new Set(genresList)]);
      }
    }
  }, [data]);

  const fitlerBook = async (genre) => {
    setCurrGenre(genre);
    const { data } = await refetch({
      genre: genre === "all genres" ? null : genre,
    });
    setFilteredBooks(data.allBooks);
  };

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
          {filteredBook.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      {genres.map((g) => (
        <button key={g} onClick={() => fitlerBook(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => fitlerBook("all genres")}>all genres</button>
    </div>
  );
};

export default Books;
