import "./styles.css";
import React, { Component } from "react";
import { TodoData } from "./TodoData";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: "asc",
      listNum: "",
      TodoLists: TodoData
    };
  }

  onSort = (listNum, sortType) => {
    listNum.sort((a, b) => {
      const isReversed = sortType === "asc" ? 1 : -1;
      return isReversed * a.text.localeCompare(b.text);
    });
    this.setState({ sortType });
  }

  render() {
    return (
      <div className="App text-secondary">
        <Nav
          lists1={this.state.TodoLists.TodoList1}
          lists2={this.state.TodoLists.TodoList2}
          sortType={this.state.sortType}
          listNum={this.state.listNum}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

export default App;
