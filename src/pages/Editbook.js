// src/components/EditBook.js
import React, { useState, useEffect } from "react";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { useBooks } from "../context/BookContext";
import { useParams } from "react-router-dom";  

const EditBook = () => {
  const { books, updateBook } = useBooks();
  const { bookId } = useParams(); 

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");



  useEffect(() => {
    const bookToEdit = books.find((book) => book.id === parseInt(bookId, 10));
    if (bookToEdit) {
      setName(bookToEdit.name);
      setDescription(bookToEdit.description);
    }
  }, [books, bookId]);

  const handleUpdateBook = () => {
    if (name && description) {
      const updatedBook = { bookId, name, description };

      updateBook(updatedBook);
   
    }
  };

  return (
    <Box>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Stack direction="row" spacing={4}>
        <Button onClick={handleUpdateBook}>Save</Button>
        {/* <Button onClick={onClose}>Cancel</Button> */}
      </Stack>
    </Box>
  );
};

export default EditBook;
