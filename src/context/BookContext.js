// src/components/BooksContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import client from "../apollo-client";
import { gql } from "@apollo/client";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const GET_BOOKS_QUERY = gql`
    query {
      books {
        id
        name
        description
      }
    }
  `;

  const { data, loading } = useQuery(GET_BOOKS_QUERY, {
    client,
  });

  useEffect(() => {
    if (!loading && data) {
      setBooks(data.books);
    }
  }, [loading, data]);

  const ADD_BOOK_MUTATION = gql`
    mutation AddBook($newBook: CreateBookInput!) {
      createBook(bookInput: $newBook) {
        name
        description
      }
    }
  `;

  const [addBookMutation] = useMutation(ADD_BOOK_MUTATION, {
    client,
    update(cache, { data: { createBook } }) {
      cache.modify({
        id: cache.identify(createBook),
        fields: {
          books(existingBooks = []) {
            const newBookRef = cache.writeFragment({
              data: createBook,
              fragment: gql`
                fragment NewBook on Book {
                  id
                }
              `,
            });
            return [newBookRef, ...existingBooks];
          },
        },
      });
    },
  });

  const addBook = async (newBook) => {
    try {
      const { data } = await addBookMutation({
        variables: {
          newBook: newBook,
        },
      });
      // Optionally handle the response data if needed
    } catch (error) {
      console.error("Error adding a book:", error);
    }
  };

  const UPDATE_BOOK_MUTATION = gql`
    mutation UpdateBook($updatedBook: UpdateBookInput!) {
      updateBook(bookInput: $updatedBook) {
        id
        name
        description
      }
    }
  `;

  const [updateBookMutation] = useMutation(UPDATE_BOOK_MUTATION, {
    client,
  });

  const updateBook = async (updatedBook) => {
    try {
      const { data } = await updateBookMutation({
        variables: {
          updatedBook: updatedBook,
        },
      });
     
    } catch (error) {
      console.error("Error updating a book:", error);
    }
  };

  const DELETE_BOOK_MUTATION = gql`
    mutation DeleteBook($bookId: Int!) {
      deleteBook(id: $bookId)
    }
  `;

  const [deleteBookMutation] = useMutation(DELETE_BOOK_MUTATION, {
    client,
  });

  const deleteBook = async (bookId) => {
    try {
      await deleteBookMutation({
        variables: {
          bookId: bookId,
        },
      });
      // Optionally handle the response data if needed
    } catch (error) {
      console.error("Error deleting a book:", error);
    }
  };

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};
