import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import productsData from "./products";
import NavBar from "./navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "Shop 2 React",
      products: productsData,
      screen: "shop", // shop | signin | checkout
      fbData: null,
      sortOrder: "normal",
    };
  }

  handleAdd = (id) => {
    const updated = this.state.products.map((p) =>
      p.id === id ? { ...p, value: p.value + 1 } : p
    );
    this.setState({ products: updated });
  };

  handleSubtract = (id) => {
    const updated = this.state.products.map((p) =>
      p.id === id && p.value > 0 ? { ...p, value: p.value - 1 } : p
    );
    this.setState({ products: updated });
  };

  handleCheckOut = () => {
    this.setState({ screen: "signin" });
  };

  handleFBLogin = (response) => {
    if (response.accessToken) {
      this.setState({ fbData: response, screen: "checkout" });
    }
  };

  handleContinueShopping = () => {
    this.setState({ screen: "shop" });
  };

  handleSort = (e) => {
    this.setState({ sortOrder: e.target.value });
  };

  getSortedProducts = () => {
    const products = [...this.state.products];
    switch (this.state.sortOrder) {
      case "lowest":
        return products.sort((a, b) => a.price - b.price);
      case "highest":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products.sort((a, b) => a.id - b.id);
    }
  };

  render() {
    const totalQty = this.state.products
      .map((p) => p.value)
      .reduce((acc, val) => acc + val, 0);

    return (
      <div>
        <NavBar
          siteName={this.state.siteName}
          total={totalQty}
          products={this.getSortedProducts()}
          onAdd={this.handleAdd}
          onSubtract={this.handleSubtract}
          screen={this.state.screen}
          fbData={this.state.fbData}
          onCheckOut={this.handleCheckOut}
          onFBLogin={this.handleFBLogin}
          onContinueShopping={this.handleContinueShopping}
          sortOrder={this.state.sortOrder}
          onSort={this.handleSort}
        />
      </div>
    );
  }
}

export default App;
