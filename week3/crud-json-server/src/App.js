import React from "react";
import Lists from "./Lists";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: "",
      },
    };
  }

  getLists = () => {
    this.setState({ loading: true });
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          this.setState({ loading: false, alldata: json });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let loading;
    if (this.state.loading) {
      loading = <p>Loading...</p>;
    } else {
      loading = <Lists alldata={this.state.alldata} />;
    }

    return (
      <div className="container">
        <h1>CRUD with JSON Server</h1>
        <button className="btn btn-primary" onClick={this.getLists}>
          Get Lists
        </button>
        <br />
        <br />
        {loading}
      </div>
    );
  }
}

export default App;
