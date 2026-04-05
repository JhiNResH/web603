import React, { Component } from "react";
import { Link } from "react-router-dom";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/books")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ books: json, loading: false });
      })
      .catch((err) => console.log(err));
  }

  removeBook = async (id) => {
    await fetch("http://localhost:8080/api/book/" + id, {
      method: "DELETE",
    });
    const updated = this.state.books.filter((book) => book._id !== id);
    this.setState({ books: updated });
  };

  render() {
    const { books, loading } = this.state;

    if (loading) return <p className="container mt-3">Loading...</p>;

    const bookRows = books.map((book) => (
      <tr key={book._id}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <Link to={"/books/" + book._id} className="btn btn-warning btn-sm me-2">
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.removeBook(book._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="container mt-3">
        <h2>Book List</h2>
        <Link to="/books/new" className="btn btn-success mb-3">
          Add Book
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{bookRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BookList;
