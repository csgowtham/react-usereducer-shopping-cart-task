import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  products: [],
  totalDiscountedPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'UPDATE_QUANTITY':
      const updatedProducts = state.products.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, products: updatedProducts };
    case 'UPDATE_TOTAL_PRICE':
      return { ...state, totalDiscountedPrice: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/product.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.products)) {
          const productsWithQuantity = data.products.map(product => ({
            ...product,
            quantity: 1,
          }));
          dispatch({ type: 'SET_PRODUCTS', payload: productsWithQuantity });
        } else {
          console.error('Fetched data is not in the expected format:', data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const totalPrice = state.products.reduce((total, product) => {
      const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
      return total + discountedPrice * product.quantity;
    }, 0);
    dispatch({ type: 'UPDATE_TOTAL_PRICE', payload: totalPrice });
  }, [state.products]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: newQuantity } });
  };

  return (
    <CartContext.Provider value={{ products: state.products, totalDiscountedPrice: state.totalDiscountedPrice, handleUpdateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
