import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CSSReset } from "@chakra-ui/react";
import CreateBook from "./pages/CreateBook";
import BookList from "./pages/BookList";

import EditBook from "./pages/Editbook";
import DeleteBook from "./pages/DeleteBook";
import Navigation from "./components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <CSSReset />
      <Navigation />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateBook />} />

        <Route
          path="/edit/:bookId"
          element={isAuthenticated ? <EditBook /> : null}
        />
        <Route
          path="/delete/:bookId"
          element={isAuthenticated ? <DeleteBook /> : null }
        />
      </Routes>
    </Router>
  );
}

export default App;
