import React from "react";

function CheckOut(props) {
  const cartItems = props.products.filter((p) => p.value >= 1);

  return (
    <div className="container mt-5">
      <h3>Check Out</h3>
      <hr />
      {props.fbData && (
        <p className="text-muted">
          Signed in as: <strong>{props.fbData.name}</strong>
        </p>
      )}
      {cartItems.map((product) => (
        <div
          key={product.id}
          className="d-flex align-items-center border-bottom py-3"
        >
          <img
            src={product.image}
            alt={product.desc}
            width="60"
            height="60"
            style={{ objectFit: "contain" }}
          />
          <div className="ms-3">
            <p className="mb-0 fw-bold">{product.desc}</p>
            <small>Quantity: {product.value}</small>
          </div>
        </div>
      ))}
      <div className="mt-3">
        <p className="fs-5">
          Total items: <strong>{cartItems.reduce((a, p) => a + p.value, 0)}</strong>
        </p>
      </div>
    </div>
  );
}

export default CheckOut;
