import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAllProducts } from "../../axios-instance/HttpRequestHandlerService";
import CartComponent from "../../components/cartComponent/CartComponent";
import ProductListComponent from "../../components/productListComponent/ProductListComponent";

function HomePage({ showCart, cartToggleHandler }) {
  const [availableProducts, updateAvailableProducts] = useState([]);
  const [cartProducts, updateCartProducts] = useState([]);

  const getAvailableProducts = async () => {
    let productsData = await getAllProducts();
    productsData = productsData?.data
      ? productsData.data.map((product) => {
          return {
            ...product,
            quantity: +product.quantity,
            price: +product.price,
          };
        })
      : [];
    updateAvailableProducts(productsData);
  };

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

  const addItemToCart = (productId) => {
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

  const addToCartHandler = (productId) => {
    decrementAvailableProducts(productId);
    addItemToCart(productId);
  };

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

  const removeFromCartHandler = (productId) => {
    const availableQtyIncrement = removeItemFromCart(productId);

    addItemsToAvailableProducts(productId, availableQtyIncrement);
  };

  useEffect(() => {
    getAvailableProducts();
  }, []);

  return (
    <Fragment>
      <ProductListComponent
        productList={availableProducts}
        cartActionHandler={addToCartHandler}
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
  showCart: PropTypes.bool,
  cartToggleHandler: PropTypes.func,
};

export default HomePage;
