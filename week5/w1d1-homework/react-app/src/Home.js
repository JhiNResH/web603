import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1>Welcome to Inventory App</h1>
        <Link to="/inventories" className="btn btn-primary mt-3">
          Manage Inventory List
        </Link>
      </div>
    </div>
  );
}

export default Home;
