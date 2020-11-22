import React from "react";
import PropTypes from "prop-types";
import { ShoppingCart } from "react-feather";
import ImageComponent from "../imagecomponent/ImageComponent";
import Logo from "../../Assets/logo1.png";
import "./HeaderComponent.scss";

function HeaderComponent({ cartToggleHandler, cartItemCount }) {
  return (
    <header className="header">
      <div className="header__item">
        <ImageComponent src={Logo} alt="logo image" width={100} height={40} />
      </div>
      <div
        className="header__item"
        onClick={() => {
          cartToggleHandler(true);
        }}
      >
        <ShoppingCart size={20} color="#595b83" />
        <div className="items-count">{cartItemCount}</div>
        <span>Cart</span>
      </div>
    </header>
  );
}

HeaderComponent.propTypes = {
  cartToggleHandler: PropTypes.func,
  cartItemCount: PropTypes.number,
};

export default HeaderComponent;
