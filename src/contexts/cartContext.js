import React from "react";

const cartContext = React.createContext({
  cartItemsCount: 0,
  toggleCart: () => {},
});

export default cartContext;
