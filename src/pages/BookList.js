import React from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useBooks } from "../context/BookContext";
import { useNavigate } from "react-router-dom"; 

const BookList = () => {
  const { books } = useBooks();
  const navigate = useNavigate(); 

  const handleEditClick = (bookId) => {
 
    navigate(`/edit/${bookId}`);
  };

  const handleDeleteClick = (bookId) => {
    
    navigate(`/delete/${bookId}`);
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <Tr key={book?.id}>
              <Td>{book?.name}</Td>
              <Td>{book?.description}</Td>
              <Td>
                <Button
                  marginRight={2}
                  onClick={() => handleEditClick(book.id)}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDeleteClick(book.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BookList;
