function Cart(props) {
  const cartItems = props.products.filter(p => p.value >= 1);

  return (
    <div className="container mt-3">
      <h5>Your Cart Items</h5>
      {cartItems.map(product => (
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
    </div>
  );
}

export default Cart;
