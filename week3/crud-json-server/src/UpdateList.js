import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    props.getSingleList(null, props.id);
    setShow(true);
  };

  return (
    <React.Fragment>
      <Button variant="warning" size="sm" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
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
              props.updateList(e, props.id);
              handleClose();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UpdateList;
