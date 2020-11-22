import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAllProducts } from "../../axios-instance/HttpRequestHandlerService";
import CartComponent from "../../components/cartComponent/CartComponent";
import ProductListComponent from "../../components/common/productListComponent/ProductListComponent";

/**
 *
 * this component is responsible for managing states for both productList and cart List
 *
 * @param {boolean} showenCart - decides weather to display cart or not
 *
 * @param {Function} cartToggleHandler - toggle cart state when clicked on close icon
 *
 *
 * @param {Function} updateCartItemCount - update cart item count when item is removed or added to cart
 */
function HomePage({ showCart, cartToggleHandler, updateCartItemCount }) {
  // stores and update available product list
  const [availableProducts, updateAvailableProducts] = useState([]);

  // store and update cart item list
  const [cartProducts, updateCartProducts] = useState([]);

  /**
   *
   * responsible for getting all products from api and storing them into state
   *
   */
  const getAvailableProducts = async () => {
    try {
      let productsData = await getAllProducts();
      productsData = productsData?.data
        ? productsData.data.map((product) => {
            return {
              // converting quantity and price fields to number from string to avoid type conflicts
              ...product,
              quantity: +product.quantity,
              price: +product.price,
            };
          })
        : [];
      updateAvailableProducts(productsData);
    } catch (err) {
      //here we can add error handeling if api throws any error
      console.log(err);
    }
  };

  /**
   *
   * responsible decreasing count of product added to cart
   *
   * @param {number} productId  - id of product for which count to be decreased in available product list
   */
  const decrementAvailableProducts = (productId) => {
    let availableProductsCopy = [...availableProducts];
    availableProductsCopy = availableProductsCopy.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      } else {
        return product;
      }
    });

    updateAvailableProducts(availableProductsCopy);
  };

  /**
   *
   * responsible for adding item to cart
   *
   * @param {number} productId - id of product to be added into cart
   */
  const addItemToCart = (productId) => {
    /**
     *
     *
     * check if item already exists in cart
     *
     * if item exist in cart then only increment its count
     *
     * else add new oblect in cart
     *
     */
    const cartProductsCopy = [...cartProducts];
    const alreadyAddedProductIndex = cartProductsCopy.findIndex(
      (product) => product.id === productId
    );
    if (alreadyAddedProductIndex >= 0) {
      const alreadyAddedProduct = cartProductsCopy[alreadyAddedProductIndex];
      cartProductsCopy[alreadyAddedProductIndex] = {
        ...alreadyAddedProduct,
        quantity: alreadyAddedProduct.quantity + 1,
      };
    } else {
      const productToAddToCart = availableProducts.find(
        (product) => product.id === productId
      );
      cartProductsCopy.push({
        ...productToAddToCart,
        quantity: 1,
      });
    }
    updateCartProducts(cartProductsCopy);
  };

  /**
   *
   * remove product for given id from cart
   *
   * @param {number} productId - product id to be removed from cart
   *
   * @returns {number} product quantity in cart that need to be incremented in available items
   *
   *
   */
  const removeItemFromCart = (productId) => {
    let quantityRemovedFromCart = 0;
    const cartItemsCopy = [...cartProducts];
    const filteredCartItems = cartItemsCopy.filter((product) => {
      if (product.id !== productId) {
        return true;
      }
      quantityRemovedFromCart = product.quantity;
      return false;
    });

    updateCartProducts(filteredCartItems);
    return quantityRemovedFromCart;
  };

  /**
   *
   * responsible for increasing quantity of products in available list when removed from cart
   *
   * @param {number} productId  - id for which quantity to be increased in available product list
   * @param {number} qtyIncrement - quantitiy to be increased
   *
   *
   */
  const addItemsToAvailableProducts = (productId, qtyIncrement) => {
    let availableProductsCopy = [...availableProducts];
    availableProductsCopy = availableProductsCopy.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: +product.quantity + +qtyIncrement,
        };
      }
      return product;
    });

    updateAvailableProducts(availableProductsCopy);
  };

  /**
   * responsible for calling respective methods to update both lists
   *
   * also updates count of products in cart in parent
   *
   * @param {number} productId  - product to be added to cart and removed from available products
   *
   */
  const addToCartHandler = (productId) => {
    decrementAvailableProducts(productId);
    addItemToCart(productId);
    updateCartItemCount(1, "add");
  };

  /**
   *
   * responsible for adding items to available list and remove from cart
   *
   *  also updates count of products in cart in parent
   *
   * @param {number} productId  product to be removed from cart and added to available list
   */

  const removeFromCartHandler = (productId) => {
    const availableQtyIncrement = removeItemFromCart(productId);
    addItemsToAvailableProducts(productId, availableQtyIncrement);
    updateCartItemCount(availableQtyIncrement, "remove");
  };

  /**
   * fetch list of all products on load
   *
   */
  useEffect(() => {
    getAvailableProducts();
  }, []);

  return (
    <Fragment>
      <ProductListComponent
        productList={availableProducts}
        productActionctionHandler={addToCartHandler}
        action="ADD TO CART"
      />
      {showCart && (
        <CartComponent
          cartItems={cartProducts}
          productActionHandler={removeFromCartHandler}
          action={"REMOVE"}
          cartToggleHandler={cartToggleHandler}
        />
      )}
    </Fragment>
  );
}

HomePage.propTypes = {
  cartToggleHandler: PropTypes.func,
  updateCartItemCount: PropTypes.func,
  showCart: PropTypes.bool,
};

export default HomePage;
