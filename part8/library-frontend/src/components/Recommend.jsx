import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { useEffect, useState } from "react";

const Recommend = ({ show, token }) => {
  if (!show) {
    return null;
  }

  const [user, setUser] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const userResult = useQuery(ME);

  const [getBooks, { loading, data: bookData }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me);
      console.log(userResult.data);
    }
  }, [userResult.data]);

  useEffect(() => {
    if (user && user.favoriteGenre) {
      console.log(user.favoriteGenre);
      getBooks({ variables: { genre: user.favoriteGenre } });
    }
  }, [user, getBooks]);

  useEffect(() => {
    if (bookData) {
      setRecommendedBooks(bookData.allBooks);
      console.log(bookData.allBooks);
    }
  }, [bookData]);

  return (
    <div>
      <h2>recommendations</h2>
      {user ? (
        <div>
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
              {recommendedBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>no user</div>
      )}
    </div>
  );
};

export default Recommend;
