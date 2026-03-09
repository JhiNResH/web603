import "./styles.css";
import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoList1: [
        { id: 1, text: "Eat Breakfast", note: "Make Eggs and Pancakes", done: false },
        { id: 2, text: "Walk Dog", note: "Bring doggie bag", done: false },
        { id: 3, text: "Take Shower", note: "Shower no later than 10am!", done: false }
      ],
      TodoList2: [
        { id: 1, text: "Get Lunch", note: "Lunch at Sandbox", done: false },
        { id: 2, text: "Run a Mile", note: "Stop by mom at end of run", done: false },
        { id: 3, text: "Take Bath", note: "Prep half hour before. Replenish bath oil.", done: false }
      ],
      TodoList3: [
        { id: 1, text: "Buy Groceries", note: "Don't forget milk and eggs!", done: false },
        { id: 2, text: "Do Laundry", note: "Separate darks from whites.", done: false },
        { id: 3, text: "Read a Book", note: "Finish chapter 5 today.", done: false }
      ],
      TodoList4: [
        { id: 1, text: "Go to Gym", note: "Leg day - don't skip!", done: false },
        { id: 2, text: "Cook Dinner", note: "Try the new pasta recipe.", done: false },
        { id: 3, text: "Call a Friend", note: "Call Sarah about the weekend.", done: false }
      ],
      TodoList5: [
        { id: 1, text: "Clean the House", note: "Start with the kitchen.", done: false },
        { id: 2, text: "Watch a Movie", note: "That new sci-fi film is out!", done: false },
        { id: 3, text: "Go for a Walk", note: "Try the new trail in the park.", done: false }
      ],
      TodoList6: [
        { id: 1, text: "Sleep In", note: "You deserve the rest!", done: false },
        { id: 2, text: "Visit Family", note: "Bring dessert for everyone.", done: false },
        { id: 3, text: "Plan Next Week", note: "Review your goals first.", done: false }
      ],
      TodoList7: [
        { id: 1, text: "Meal Prep", note: "Prep for the whole week.", done: false },
        { id: 2, text: "Do Homework", note: "Complete all assignments!", done: false },
        { id: 3, text: "Get Good Sleep", note: "Aim for 8 hours tonight.", done: false }
      ]
    };
  }

  render() {
    let d = new Date(); /* Get current date */

    let day = new Array(7); /* Create array of days */
    day[0] = "Sunday";
    day[1] = "Monday";
    day[2] = "Tuesday";
    day[3] = "Wednesday";
    day[4] = "Thursday";
    day[5] = "Friday";
    day[6] = "Saturday";

    /* Extract day from date as number and find matching index from array */
    let n = day[d.getDay()];

    /* Create a variable to store selected todo list */
    let todo;

    /* Test which todo list based on current day and set the correct list to the variable */
    if (n === "Monday") {
      todo = <Todos todolists={this.state.TodoList1} />;
    } else if (n === "Tuesday") {
      todo = <Todos todolists={this.state.TodoList2} />;
    } else if (n === "Wednesday") {
      todo = <Todos todolists={this.state.TodoList3} />;
    } else if (n === "Thursday") {
      todo = <Todos todolists={this.state.TodoList4} />;
    } else if (n === "Friday") {
      todo = <Todos todolists={this.state.TodoList5} />;
    } else if (n === "Saturday") {
      todo = <Todos todolists={this.state.TodoList6} />;
    } else if (n === "Sunday") {
      todo = <Todos todolists={this.state.TodoList7} />;
    }

    return (
      <div className="App">
        { /* Output final view */ }
        <h1>
          <span className="d-flex justify-content-center text-warning">
            {n}'s
          </span>
          Todo List
        </h1>
        { /* Render the variable that contains the todo component calling */ }
        {todo}
      </div>
    );
  }
}

function Todos(props) {
  const handleNote = (getNote) => {
    $("#note").empty().append(getNote);
    $("#notebox").css("visibility", "visible");
  };

  const dismissNote = () => {
    $("#note").empty();
    $("#notebox").css("visibility", "hidden");
  };

  return (
    <ListGroup>
      {props.todolists.map((todolist) => (
        <ListGroupItem
          key={todolist.id}
          tag="button"
          onClick={() => handleNote(todolist.note)}
          className="align-self-center py-2 w-50 bg-info text-white"
        >
          {todolist.text}
        </ListGroupItem>
      ))}
      <ListGroupItem
        id="notebox"
        className="border border-dark rounded m-5"
      >
        <div id="note" className="mt-1 font-weight-bold text-dark"></div>
        <button
          id="btn"
          className="w-25 mt-2 align-self-center bg-warning border-0"
          onClick={() => dismissNote()}
        >
          Done
        </button>
      </ListGroupItem>
    </ListGroup>
  );
}

export default App;
