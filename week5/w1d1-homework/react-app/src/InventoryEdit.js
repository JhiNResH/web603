import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const emptyItem = {
  prodname: "",
  qty: "",
  price: "",
  status: "",
};

class InventoryEditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: emptyItem,
    };
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id !== "new") {
      const response = await fetch("http://localhost:8080/api/inventory/" + id);
      const data = await response.json();
      this.setState({ item: data });
    }
  }

  handleChange = (e) => {
    let item = { ...this.state.item };
    item[e.target.name] = e.target.value;
    this.setState({ item });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { item } = this.state;
    const { id } = this.props.params;

    if (id === "new") {
      await fetch("http://localhost:8080/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } else {
      await fetch("http://localhost:8080/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    }
    this.props.navigate("/inventories");
  };

  render() {
    const { item } = this.state;
    const { id } = this.props.params;
    const title = id === "new" ? "Add Inventory" : "Edit Inventory";

    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <h3>{title}</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="prodname"
                value={item.prodname}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Qty</label>
              <input
                type="number"
                className="form-control"
                name="qty"
                value={item.qty}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={item.price}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                name="status"
                value={item.status}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.props.navigate("/inventories")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function InventoryEdit(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <InventoryEditClass {...props} params={params} navigate={navigate} />;
}

export default InventoryEdit;
