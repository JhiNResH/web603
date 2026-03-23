function Cart(props) {
  const cartItems = props.products.filter((p) => p.value >= 1);
  const totalQty = cartItems.reduce((acc, p) => acc + p.value, 0);

  return (
    <div className="container mt-3">
      <h5>Your Cart Items</h5>
      {totalQty === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-5">
            You have <strong>{totalQty}</strong> item(s) in your cart.
          </p>
          <button
            className="btn btn-primary"
            onClick={props.onContinueShopping}
          >
            Continue Shop
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="d-flex align-items-center border-bottom py-3"
            >
              <img
                src={product.image}
                alt={product.desc}
                width="80"
                height="80"
                style={{ objectFit: "contain" }}
              />
              <div className="ms-3">
                <p className="mb-1">Quantity: {product.value}</p>
                <small>{product.desc}</small>
              </div>
            </div>
          ))}
          <div className="mt-3">
            <button className="btn btn-success" onClick={props.onCheckOut}>
              Check Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
