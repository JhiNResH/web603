import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import BookEdit from "./BookEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
