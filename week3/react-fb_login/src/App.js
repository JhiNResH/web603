import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture?.data?.url || "");
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="App">
      {!login ? (
        <Card className="login-card">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <LoginForm />
            <hr />
            <FacebookLogin
              appId="930180989761769"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          </Card.Body>
        </Card>
      ) : (
        <Home fbpic={picture} fbname={data.name} fbemail={data.email} />
      )}
    </div>
  );
}

function LoginForm() {
  return (
    <div className="login-form">
      <input type="text" placeholder="Username" className="form-control mb-2" />
      <input type="password" placeholder="Password" className="form-control mb-2" />
      <button className="btn btn-primary btn-block">Login</button>
    </div>
  );
}

function Home({ fbpic, fbname, fbemail }) {
  return (
    <Card className="home-card">
      <Card.Body>
        <Card.Title>Welcome Home</Card.Title>
        {fbpic && <img src={fbpic} alt="profile" className="profile-pic" />}
        <h3>{fbname}</h3>
        <p>{fbemail}</p>
      </Card.Body>
    </Card>
  );
}

export default App;
