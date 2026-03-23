import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    props.getSingleList(null, props.id);
    setShow(true);
  };

  return (
    <React.Fragment>
      <Button variant="danger" size="sm" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Title"
            value={props.singledata.title}
            disabled
          />
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Author"
            value={props.singledata.author}
            disabled
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              props.deleteList(e, props.id);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteList;
