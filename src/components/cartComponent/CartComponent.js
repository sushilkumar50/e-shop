import React from "react";
import PropTypes from "prop-types";
import { XCircle, PlusSquare } from "react-feather";

import "./CartComponent.scss";
import ProductListComponent from "../common/productListComponent/ProductListComponent";

/**
 *
 * @param {Array} cartItems - list of items in cart
 *
 * @param {Function} cartToggleHandler - handler to hide or show cart
 *
 * @param {Function} productActionctionHandler - handler to remove items from cart
 *
 * @param {string} action - remove action
 *
 *
 * @returns cart items list jsx
 *
 */
const CartComponent = ({
  cartItems,
  cartToggleHandler,
  productActionHandler,
  action,
}) => {
  /**
   *
   * to get total cart amount
   *
   */
  const getCartTotal = () => {
    return cartItems.reduce((prev, currProduct) => {
      prev = prev + +currProduct.quantity * +currProduct.price;
      return prev;
    }, 0);
  };

  /**
   *
   * jsx to render when there are no items in cart
   *
   */
  const emptyCart = () => {
    return (
      <div className="emptyCart-message">
        <PlusSquare size={40} />
        <span>Cart is Empty Add Products</span>
      </div>
    );
  };
  return (
    <div className="cart-container">
      <section className="cart">
        <div className="cart__header">
          <span>Your Cart</span>
          <div>{`cart Total: Rs. ${getCartTotal()}`}</div>
          <span
            onClick={() => {
              cartToggleHandler(false);
            }}
          >
            <XCircle size={20} />
          </span>
        </div>
        {!cartItems.length ? emptyCart() : null}
        {cartItems.length ? (
          <div className="cart__list">
            <ProductListComponent
              productList={cartItems}
              action={action}
              productActionctionHandler={productActionHandler}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
};

CartComponent.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
      image: PropTypes.string,
    })
  ),
  cartToggleHandler: PropTypes.func,
  productActionHandler: PropTypes.func,
  action: PropTypes.string,
};

export default CartComponent;
