// App.js
import React, { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from './CartContext';

function App() {
  const { products, totalDiscountedPrice } = useContext(CartContext);
  const additionalCharge = 0.1 * totalDiscountedPrice;
  const finalTotal = totalDiscountedPrice + additionalCharge;

  return (
    <div className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {products.length} items</h5>
              </div>
              <div className="card-body">
                {products.map(product => (
                  <CartItem key={product.id} data={product} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>${totalDiscountedPrice.toFixed(2)}</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including 10% VAT)</p>
                      </strong>
                    </div>
                    <span><strong>${finalTotal}</strong></span>
                  </li>
                </ul>
                <button type="button" className="btn btn-primary btn-lg btn-block">
                  Go to checkout
                </button>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p><strong>Expected shipping delivery</strong></p>
                <p className="mb-0">08.06.2024 - 09.07.2024</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p><strong>We accept</strong></p>
                <img className="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa" />
                <img className="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express" />
                <img className="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
                <img className="me-2" width="45px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MEGCFgqLEiltvN8iKllV5eF2mLCn459iLg&s"
                  alt="PayPal acceptance mark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
