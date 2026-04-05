import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

function DisplayProducts(props) {
  const [show, setShow] = useState(false);
  const [showImge, setShowImge] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setShowImge(product);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center px-3 py-2 border-bottom">
        <label className="me-2 fw-bold">Sort by Price:</label>
        <select
          className="form-select w-auto"
          value={props.sortOrder}
          onChange={props.onSort}
        >
          <option value="normal">Normal</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      {props.products.map(product => (
        <div
          key={product.id}
          className="d-flex align-items-center border-bottom py-3 px-3"
        >
          <img
            src={product.image}
            alt={product.desc}
            width="80"
            height="80"
            style={{ objectFit: "contain", cursor: "pointer" }}
            onClick={() => handleShow(product)}
          />
          <span className="mx-4" style={{ minWidth: "150px" }}>
            {product.desc}
          </span>
          <span className="me-4 text-success fw-bold" style={{ minWidth: "80px" }}>
            ${product.price.toFixed(2)}
          </span>
          <div className="d-flex align-items-center gap-2">
            <FontAwesomeIcon
              icon={faSquarePlus}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={() => props.onAdd(product.id)}
            />
            <FontAwesomeIcon
              icon={faSquareMinus}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={() => props.onSubtract(product.id)}
            />
            <div className="ms-1">
              <small className="text-muted d-block">Quantity</small>
              <span>{product.value}</span>
            </div>
          </div>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showImge.desc}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={showImge.image}
            width="350"
            alt={showImge.desc}
            className="mx-5"
          />
          <p>
            <span className="text-dark">Ratings:</span> {showImge.ratings}/5
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DisplayProducts;
