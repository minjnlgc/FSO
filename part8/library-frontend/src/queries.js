import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            id
            born
            bookCount
        }
    }
`

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      genres
    }
`

export const ALL_BOOKS = gql`
  query Query($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title, 
        author: $author, 
        published: $published, 
        genres: $genres
    ) {
      ...BookDetails
    }
  }

${BOOK_DETAILS}
`

export const EDIT_BIRTH = gql`
mutation($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query Me {
  me {
    username
    favoriteGenre
    id
  }
}
`
export const BOOK_ADDED = gql`
  subscription bookAdded {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`