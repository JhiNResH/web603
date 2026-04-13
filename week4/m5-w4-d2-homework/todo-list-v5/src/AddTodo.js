import React from "react";

function AddTodo(props) {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (props.inputValue.trim()) {
            props.addTodo();
          }
        }}
      >
        <div className="mb-2">
          <input
            type="text"
            className="border border-secondary rounded p-1"
            placeholder="Add Todo Item"
            value={props.inputValue}
            onChange={(e) => props.handleInput(e)}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="border border-secondary rounded p-1"
            placeholder="Add Todo Note"
            value={props.noteValue}
            onChange={(e) => props.handleNote(e)}
          />
        </div>
        <button type="submit" className="btn btn-default border border-secondary px-3">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
