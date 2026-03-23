import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CreateList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Title"
            value={props.singledata.title}
            onChange={props.handleChange}
          />
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Author"
            value={props.singledata.author}
            onChange={props.handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              props.postList(e);
              handleClose();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateList;
