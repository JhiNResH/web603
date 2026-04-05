import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import InventoryList from "./InventoryList";
import InventoryEdit from "./InventoryEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/:id" element={<InventoryEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
