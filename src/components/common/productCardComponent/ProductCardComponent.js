import React from "react";
import PropTypes from "prop-types";

import "./ProductCardComponent.scss";
import ImageComponent from "../imagecomponent/ImageComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";

/**
 *
 * @param {Object} product - product to be rendered
 *
 * @param {Function} productActionHandler - handler for actions on product adding or removing from cart
 *
 * @param {string} action - action that can be performed on product item
 *
 * @returns single product card
 *
 */

const ProductCardComponent = ({ product, productActionHandler, action }) => {
  /**
   *
   * calls provided action handler with product id to be perfomed action on
   *
   */
  const clickHandler = () => {
    productActionHandler(product.id);
  };
  return (
    <div className="list-item">
      <ImageComponent
        src={product.image}
        alt={`${product.name} image`}
        width={"100%"}
        height={300}
      />
      <div className="content">
        <div className="content__name item">{product.name}</div>
        <div className="content__info item">
          <div className="content__info-price item">{`Rs. ${product.price}`}</div>
          <div className="content__info-quantity item">{`Qty: ${product.quantity}`}</div>
        </div>
        <div className="content__description item" title={product.description}>
          {product.description}
        </div>
        <ButtonComponent
          clickHandler={clickHandler}
          disabled={product.quantity === 0}
          label={action}
        />
      </div>
    </div>
  );
};

ProductCardComponent.propTypes = {
  product: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string,
  }),
  productActionHandler: PropTypes.func,
  action: PropTypes.string,
  screen: PropTypes.string,
};

export default ProductCardComponent;
