import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";

const emptyItem = { title: "", author: "" };

class BookEditClass extends Component {
  constructor(props) {
    super(props);
    this.state = { item: emptyItem };
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id !== "new") {
      const response = await fetch("http://localhost:8080/api/book/" + id);
      const data = await response.json();
      this.setState({ item: data });
    }
  }

  handleChange = (e) => {
    let item = { ...this.state.item };
    item[e.target.name] = e.target.value;
    this.setState({ item });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { item } = this.state;
    const { id } = this.props.params;

    if (id === "new") {
      await fetch("http://localhost:8080/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } else {
      await fetch("http://localhost:8080/api/book", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    }
    this.props.navigate("/");
  };

  render() {
    const { item } = this.state;
    const { id } = this.props.params;
    const title = id === "new" ? "Add Book" : "Edit Book";

    return (
      <div className="container mt-3">
        <h3>{title}</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={item.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={item.author}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.props.navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

function BookEdit(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <BookEditClass {...props} params={params} navigate={navigate} />;
}

export default BookEdit;
