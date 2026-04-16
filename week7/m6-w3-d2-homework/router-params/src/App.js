import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <div className="container p-4">
        <p>TV APPS</p>
        <nav>
          <Link to="/netflix">
            <img
              className="nf"
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg"
              alt="Netflix"
            />
          </Link>
          <Link to="/hbomax">
            <img
              className="hb"
              src="https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg"
              alt="HBOmax"
            />
          </Link>
          <Link to="/hulu">
            <img
              className="hu"
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg"
              alt="Hulu"
            />
          </Link>
          <Link to="/primevideo">
            <img
              className="pr"
              src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"
              alt="Prime Video"
            />
          </Link>
        </nav>

        <Switch>
          <Route path="/:id">
            <Child />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Child() {
  // The missing script — grab the route param via useParams
  const { id } = useParams();

  return (
    <div>
      <h3>
        You Selected:<span>{id}</span>
      </h3>
    </div>
  );
}
