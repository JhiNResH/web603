import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faHome } from "@fortawesome/free-solid-svg-icons";
import Home from "./Home";
import AllTodos from "./AllTodos";

function Nav(props) {
  return (
    <div className="header bg-dark">
      <Router>
        {/* Navigation */}
        <ul className="nav mx-2 mb-4">
          <li>
            <Link to="/">
              <FontAwesomeIcon
                icon={faHome}
                className="fas fa-2x my-3 mr-2 text-white"
              />
            </Link>
          </li>
          <li>
            <Link to="/allLists">
              <FontAwesomeIcon
                icon={faClipboardList}
                className="fas fa-2x my-3 text-white"
              />
            </Link>
          </li>
        </ul>
        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/allLists">
            <AllTodos
              lists1={props.lists1}
              lists2={props.lists2}
              sortType={props.sortType}
              listNum={props.listNum}
              onSort={props.onSort}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Nav;
