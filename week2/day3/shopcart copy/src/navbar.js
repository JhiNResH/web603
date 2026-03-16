import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import DisplayProducts from "./displayProducts";
import Cart from "./cart";

function NavBar(props) {
  return (
    <Router>
      <nav className="navbar bg-info px-3">
        <Link to="/" className="navbar-brand text-white fw-bold text-decoration-none">
          Shop 2 <span className="react-logo">R</span>eact
        </Link>
        <Link to="/cart" className="text-white text-decoration-none">
          <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
          {props.total} items
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <DisplayProducts
              products={props.products}
              onAdd={props.onAdd}
              onSubtract={props.onSubtract}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart products={props.products} />}
        />
      </Routes>
    </Router>
  );
}

export default NavBar;
