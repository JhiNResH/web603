import "./styles.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
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
    todo = <TodoList1 />;
  } else if (n === "Tuesday") {
    todo = <TodoList2 />;
  } else if (n === "Wednesday") {
    todo = <TodoList3 />;
  } else if (n === "Thursday") {
    todo = <TodoList4 />;
  } else if (n === "Friday") {
    todo = <TodoList5 />;
  } else if (n === "Saturday") {
    todo = <TodoList6 />;
  } else if (n === "Sunday") {
    todo = <TodoList7 />;
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

function TodoList1() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Cook Breakfast
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Walk Dog
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Take Shower
      </ListGroupItem>
    </ListGroup>
  );
}

function TodoList2() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Get Lunch
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Run a Mile
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Take Bath
      </ListGroupItem>
    </ListGroup>
  );
}

function TodoList3() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Buy Groceries
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Do Laundry
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Read a Book
      </ListGroupItem>
    </ListGroup>
  );
}

function TodoList4() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Go to Gym
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Cook Dinner
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Call a Friend
      </ListGroupItem>
    </ListGroup>
  );
}

function TodoList5() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Clean the House
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Watch a Movie
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Go for a Walk
      </ListGroupItem>
    </ListGroup>
  );
}

function TodoList6() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Sleep In
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Visit Family
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Plan Next Week
      </ListGroupItem>
    </ListGroup>
  );
}

function TodoList7() {
  return (
    <ListGroup>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Meal Prep
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Do Homework
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="align-self-center py-2 w-50 bg-info text-white">
        Get Good Sleep
      </ListGroupItem>
    </ListGroup>
  );
}
