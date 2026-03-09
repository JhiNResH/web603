import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "Shop to React",
      products: [
        { id: 1, image: "./products/cologne.jpg", desc: "Unisex Cologne", value: 0 },
        { id: 2, image: "./products/iwatch.jpg", desc: "Apple iWatch", value: 0 },
        { id: 3, image: "./products/mug.jpg", desc: "Unique Mug", value: 0 },
        { id: 4, image: "./products/wallet.jpg", desc: "Mens Wallet", value: 0 }
      ]
    };
  }

  handleQtyChange = (id, qty) => {
    const updated = this.state.products.map(p =>
      p.id === id ? { ...p, value: Number(qty) } : p
    );
    this.setState({ products: updated });
  };

  render() {
    /* Chain map and reduce to get total quantity */
    const totalQty = this.state.products
      .map(p => p.value)
      .reduce((acc, val) => acc + val, 0);

    return (
      <div>
        <NavBar siteName={this.state.siteName} total={totalQty} />
        <Products
          products={this.state.products}
          onQtyChange={this.handleQtyChange}
        />
      </div>
    );
  }
}

function NavBar(props) {
  return (
    <nav className="navbar bg-info px-3">
      <span className="navbar-brand text-white fw-bold">{props.siteName}</span>
      <span className="text-white">
        <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
        {props.total} items
      </span>
    </nav>
  );
}

function Products(props) {
  return (
    <div className="container-fluid">
      {props.products.map(product => (
        <div
          key={product.id}
          className="d-flex align-items-center border-bottom py-3 px-3"
        >
          <img
            src={product.image}
            alt={product.desc}
            width="80"
            height="80"
            style={{ objectFit: "contain" }}
          />
          <span className="mx-4" style={{ minWidth: "150px" }}>
            {product.desc}
          </span>
          <input
            type="number"
            value={product.value}
            min="0"
            className="form-control"
            style={{ width: "80px" }}
            onChange={e => props.onQtyChange(product.id, e.target.value)}
          />
          <span className="ms-2 text-muted">quantity</span>
        </div>
      ))}
    </div>
  );
}

export default App;
