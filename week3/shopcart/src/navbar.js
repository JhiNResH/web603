import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import DisplayProducts from "./displayProducts";
import Cart from "./cart";
import SignIn from "./SignIn";
import CheckOut from "./CheckOut";

function NavBar(props) {
  return (
    <Router>
      <nav className="navbar bg-info px-3">
        <Link
          to="/"
          className="navbar-brand text-white fw-bold text-decoration-none"
        >
          Shop 2 <span className="react-logo">R</span>eact
        </Link>
        <Link to="/cart" className="text-white text-decoration-none">
          <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
          {props.total} items
        </Link>
      </nav>

      {props.screen === "signin" ? (
        <SignIn onFBLogin={props.onFBLogin} />
      ) : props.screen === "checkout" ? (
        <CheckOut products={props.products} fbData={props.fbData} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <DisplayProducts
                products={props.products}
                onAdd={props.onAdd}
                onSubtract={props.onSubtract}
                sortOrder={props.sortOrder}
                onSort={props.onSort}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                products={props.products}
                onCheckOut={props.onCheckOut}
                onContinueShopping={props.onContinueShopping}
              />
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default NavBar;
