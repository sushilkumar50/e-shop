import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import HomePage from "./HomePage";
import ProductListComponent from "../../components/common/productListComponent/ProductListComponent";
import CartComponent from "../../components/cartComponent/CartComponent";

configure({ adapter: new Adapter() });

const mockCartToggleHandler = jest.fn().mockImplementation(() => {});
const mockUpdateCartItemCount = jest.fn().mockImplementation(() => {});

describe("Home Page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HomePage
        showCart={false}
        cartToggleHandler={mockCartToggleHandler}
        updateCartItemCount={mockUpdateCartItemCount}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render ProductListComponent but not cartComponent if showCart flag is false", () => {
    expect(wrapper.containsMatchingElement(<ProductListComponent />)).toEqual(
      true
    );
    expect(wrapper.containsMatchingElement(<CartComponent />)).toEqual(false);
  });

  it("should render ProductList and cart component if showCart flag is true", () => {
    wrapper.setProps({
      showCart: true,
      cartToggleHandler: mockCartToggleHandler,
      updateCartItemCount: mockUpdateCartItemCount,
    });
    expect(wrapper.containsMatchingElement(<ProductListComponent />)).toEqual(
      true
    );
    expect(wrapper.containsMatchingElement(<CartComponent />)).toEqual(true);
  });
});
