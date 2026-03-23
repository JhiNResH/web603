import "./styles.css";
import React, { Component } from "react";
import { TodoData } from "./TodoData";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoLists: TodoData
    };
  }

  render() {
    return (
      { /* Output final view */ },
      (
        <div className="App text-secondary">
          <Nav
            lists1={this.state.TodoLists.TodoList1}
            lists2={this.state.TodoLists.TodoList2}
          />
        </div>
      )
    );
  }
}

export default App;
