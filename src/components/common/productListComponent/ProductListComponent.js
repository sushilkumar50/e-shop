import React from "react";
import PropTypes from "prop-types";
import ProductCardComponent from "../productCardComponent/ProductCardComponent";

import "./ProductListComponent.scss";

/**
 *
 * @param {Array} productList - list of products to be rendered
 *
 * @param {Function} productActionctionHandler - function that handles anty actions on product
 *
 * @param {string} action - actions to be performed on product ADD TO CART or REMOVE
 *
 *
 * @returns jsx for product list
 */
const ProductListComponent = ({
  productList,
  productActionctionHandler,
  action,
}) => {
  /**
   *
   * prepare jsx for products provided to component
   *
   */
  const prepareProductList = () => {
    return productList.map((product) => {
      return (
        <ProductCardComponent
          key={product.id}
          product={product}
          productActionHandler={productActionctionHandler}
          action={action}
        />
      );
    });
  };
  return <div className="productList">{prepareProductList()}</div>;
};

ProductListComponent.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
      image: PropTypes.string,
    })
  ),
  productActionctionHandler: PropTypes.func,
  action: PropTypes.oneOf(["ADD TO CART", "REMOVE"]),
};

export default ProductListComponent;
