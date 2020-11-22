import React from "react";
import PropTypes from "prop-types";
import ProductCardComponent from "../productCardComponent/ProductCardComponent";

import "./ProductListComponent.scss";

const ProductListComponent = ({ productList, cartActionHandler, action }) => {
  const prepareProductList = () => {
    return productList.map((product) => {
      return (
        <ProductCardComponent
          key={product.id}
          product={product}
          productActionHandler={cartActionHandler}
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
  cartActionHandler: PropTypes.func,
  action: PropTypes.string,
};

export default ProductListComponent;
