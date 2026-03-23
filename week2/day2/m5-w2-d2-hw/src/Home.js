import React, { Component } from "react";
import { TodoData } from "./TodoData";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoLists: TodoData,
      inputValue: "",
      noteValue: ""
    };
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }

  handleToggleTodo(id) {
    const listKey = this.currentListKey;
    const updatedList = this.state.TodoLists[listKey].map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    this.setState((prevState) => ({
      TodoLists: {
        ...prevState.TodoLists,
        [listKey]: updatedList
      }
    }));
  }

  handleAddTodo() {
    const listKey = this.currentListKey;
    const newTodo = {
      id: this.state.TodoLists[listKey].length + 1,
      text: this.state.inputValue,
      note: this.state.noteValue,
      done: false
    };
    const updatedList = [...this.state.TodoLists[listKey], newTodo];
    this.setState((prevState) => ({
      TodoLists: {
        ...prevState.TodoLists,
        [listKey]: updatedList
      },
      inputValue: "",
      noteValue: ""
    }));
  }

  handleInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleNote(e) {
    this.setState({ noteValue: e.target.value });
  }

  render() {
    let d = new Date();

    let day = new Array(7);
    day[0] = "Sunday";
    day[1] = "Monday";
    day[2] = "Tuesday";
    day[3] = "Wednesday";
    day[4] = "Thursday";
    day[5] = "Friday";
    day[6] = "Saturday";

    let n = day[d.getDay()];

    let todo;

    if (n === "Monday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList1}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList1;
      this.currentListKey = "TodoList1";
    } else if (n === "Tuesday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList2}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList2;
      this.currentListKey = "TodoList2";
    } else if (n === "Wednesday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList3}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList3;
      this.currentListKey = "TodoList3";
    } else if (n === "Thursday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList4}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList4;
      this.currentListKey = "TodoList4";
    } else if (n === "Friday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList5}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList5;
      this.currentListKey = "TodoList5";
    } else if (n === "Saturday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList6}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList6;
      this.currentListKey = "TodoList6";
    } else if (n === "Sunday") {
      todo = (
        <Todos
          todolists={this.state.TodoLists.TodoList7}
          updateTodo={this.handleToggleTodo}
        />
      );
      this.currentList = this.state.TodoLists.TodoList7;
      this.currentListKey = "TodoList7";
    }

    return (
      <div className="App">
        <h1>
          <span className="d-flex justify-content-center text-warning">
            {n}'s
          </span>
          Todo List
        </h1>
        {todo}
        <AddTodo
          inputValue={this.state.inputValue}
          noteValue={this.state.noteValue}
          handleInput={this.handleInput}
          handleNote={this.handleNote}
          addTodo={this.handleAddTodo}
        />
      </div>
    );
  }
}

export default Home;
