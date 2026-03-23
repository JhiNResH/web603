import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

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

  handleChange = (e) => {
    let singledata = { ...this.state.singledata };
    singledata[e.target.name] = e.target.value;
    this.setState({ singledata });
  };

  postList = (e) => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.singledata),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          alldata: [...this.state.alldata, json],
          singledata: { title: "", author: "" },
        });
      })
      .catch((err) => console.log(err));
  };

  getSingleList = (e, id) => {
    this.setState({ singledata: { title: "Loading...", author: "Loading..." } });
    fetch("http://localhost:5000/posts/" + id)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          this.setState({
            singledata: { title: json.title, author: json.author },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  updateList = (e, id) => {
    fetch("http://localhost:5000/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.singledata),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ singledata: { title: "", author: "" } });
        this.getLists();
      })
      .catch((err) => console.log(err));
  };

  deleteList = (e, id) => {
    fetch("http://localhost:5000/posts/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ singledata: { title: "", author: "" } });
        this.getLists();
      })
      .catch((err) => console.log(err));
  };

  render() {
    let loading;
    if (this.state.loading) {
      loading = <p>Loading...</p>;
    } else {
      loading = (
        <Lists
          alldata={this.state.alldata}
          singledata={this.state.singledata}
          handleChange={this.handleChange}
          getSingleList={this.getSingleList}
          updateList={this.updateList}
          deleteList={this.deleteList}
        />
      );
    }

    return (
      <div className="container">
        <h1>CRUD with JSON Server</h1>
        <button className="btn btn-primary me-2" onClick={this.getLists}>
          Get Lists
        </button>
        <CreateList
          singledata={this.state.singledata}
          handleChange={this.handleChange}
          postList={this.postList}
        />
        <br />
        <br />
        {loading}
      </div>
    );
  }
}

export default App;
