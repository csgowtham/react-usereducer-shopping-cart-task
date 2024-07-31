import React, { useState, useContext } from 'react';
import CartContext from './CartContext';

const CartItem = ({ data }) => {
  const { handleUpdateQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const discountedPrice = Math.round(data.price * (1 - data.discountPercentage / 100));

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleUpdateQuantity(data.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleUpdateQuantity(data.id, newQuantity);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
            <img src={data.thumbnail} className="standard-image-width" style={{width:'100%'}} alt={data.title} />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
            </a>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
          <p><strong>{data.title}</strong></p>
          <p>{data.description}</p>
          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm me-1 mb-2" data-mdb-tooltip-init title="Remove item">
            <i className="fas fa-trash"></i>
          </button>
          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-sm mb-2" data-mdb-tooltip-init title="Move to the wish list">
            <i className="fas fa-heart"></i>
          </button>
        </div>
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <p className="" htmlFor="form1">Order Quantity: <strong>{quantity}</strong></p>
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-2 py-1 me-2" onClick={handleDecrement}> - </button>
            <div data-mdb-input-init className="form-outline">
              {/* <input id="form1" min="0" name="quantity" value="1" type="number" className="form-control" onChange={handleQuantityChange}/> */}
            </div>
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-2 py-1 me-2 mr-2" onClick={handleIncrement}> + </button>
          </div>
          <p className="text-start text-md-center">
            <del>${data.price}</del>
            <strong className="p-2">${discountedPrice}</strong>
          </p>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default CartItem;
