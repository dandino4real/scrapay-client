// src/components/CreateBook.js
import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { useBooks } from "../context/BookContext";

const CreateBook = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addBook } = useBooks();

  const handleCreateBook = () => {
    const newBook = { name, description };
    addBook(newBook);
    setName("");
    setDescription("");
  };

  return (
    <Box>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleCreateBook}>Create Book</Button>
    </Box>
  );
};

export default CreateBook;
