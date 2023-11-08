import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useBooks } from "../context/BookContext"; 

const DeleteBook = ({ bookId, onClose, onDelete }) => {
  const { deleteBook } = useBooks();

  const handleDeleteBook = () => {
    deleteBook(bookId);
    onDelete();
  };

  return (
    <Box>
      <p>Are you sure you want to delete this book?</p>
      <Box mt={4}>
        <Button colorScheme="red" onClick={handleDeleteBook}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default DeleteBook;
