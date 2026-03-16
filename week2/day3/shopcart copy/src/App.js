import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import productsData from "./products";
import NavBar from "./navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "Shop 2 React",
      products: productsData
    };
  }

  handleAdd = (id) => {
    const updated = this.state.products.map(p =>
      p.id === id ? { ...p, value: p.value + 1 } : p
    );
    this.setState({ products: updated });
  };

  handleSubtract = (id) => {
    const updated = this.state.products.map(p =>
      p.id === id && p.value > 0 ? { ...p, value: p.value - 1 } : p
    );
    this.setState({ products: updated });
  };

  render() {
    const totalQty = this.state.products
      .map(p => p.value)
      .reduce((acc, val) => acc + val, 0);

    return (
      <div>
        <NavBar
          siteName={this.state.siteName}
          total={totalQty}
          products={this.state.products}
          onAdd={this.handleAdd}
          onSubtract={this.handleSubtract}
        />
      </div>
    );
  }
}

export default App;
