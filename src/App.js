import HeaderComponent from "./components/common/headerComponent/HeaderComponent";
import FooterComponent from "./components/common/footercomponent/FooterComponent";
import HomePage from "./containers/HomePage/HomePage";

import "./App.scss";
import { useState } from "react";
import ErrorBoundary from "./errorBoundaries/ErrorBoundary";

/**
 *
 *
 * renderes header footer and main content
 *
 * @returns app jsx
 *
 */

function App() {
  // store and update total items in cart
  const [cartItemsCount, updateCartItemCount] = useState(0);

  //store and update cart toggle state
  const [showCart, updateCartToggle] = useState(false);

  /**
   *
   * @param {number} quantity - quantity to increment or decrement
   * @param {string} action  - action ADD or REMOVE
   */
  const chartItemCountHandler = (quantity, action) => {
    const newQuantity =
      action === "add" ? cartItemsCount + quantity : cartItemsCount - quantity;
    updateCartItemCount(newQuantity);
  };
  return (
    <div className="app">
      <HeaderComponent
        cartToggleHandler={updateCartToggle}
        cartItemCount={cartItemsCount}
      />
      <main>
        <ErrorBoundary>
          <HomePage
            showCart={showCart}
            updateCartItemCount={chartItemCountHandler}
            cartToggleHandler={updateCartToggle}
          />
        </ErrorBoundary>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
