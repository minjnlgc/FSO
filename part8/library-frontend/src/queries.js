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

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
            id
            genres
        }
    }
`

export const ADD_BOOK = gql`
mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title, 
        author: $author, 
        published: $published, 
        genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
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