import { ListGroup, ListGroupItem } from "reactstrap";
import $ from "jquery";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <FontAwesomeIcon
            icon={todolist.done ? faCheck : faTimes}
            className="mr-2"
            onClick={(e) => {
              e.stopPropagation();
              props.updateTodo(todolist.id);
            }}
          />
          {todolist.text}
        </ListGroupItem>
      ))}
      <ListGroupItem
        id="notebox"
        className="border border-dark rounded m-5"
        style={{ visibility: "hidden" }}
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

export default Todos;
