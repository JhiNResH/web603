import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventories: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/inventories")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ inventories: json, loading: false });
      })
      .catch((err) => console.log(err));
  }

  removeInventory = async (id) => {
    await fetch("http://localhost:8080/api/inventory/" + id, {
      method: "DELETE",
    });
    const updated = this.state.inventories.filter((item) => item._id !== id);
    this.setState({ inventories: updated });
  };

  render() {
    const { inventories, loading } = this.state;

    if (loading) return <p className="container mt-3">Loading...</p>;

    const inventoryRows = inventories.map((item) => (
      <tr key={item._id}>
        <td>{item.prodname}</td>
        <td>{item.qty}</td>
        <td>{item.price}</td>
        <td>{item.status}</td>
        <td>
          <Link
            to={"/inventories/" + item._id}
            className="btn btn-warning btn-sm me-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.removeInventory(item._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <Link to="/inventories/new" className="btn btn-success mb-3">
            Add Inventory
          </Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{inventoryRows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default InventoryList;
