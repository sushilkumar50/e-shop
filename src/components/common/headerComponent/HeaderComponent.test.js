import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import HeaderComponent from "./HeaderComponent";
import ImageComponent from "../imagecomponent/ImageComponent";
import { ShoppingCart } from "react-feather";

configure({ adapter: new Adapter() });

const props = {
  cartToggleHandler: jest.fn(),
  cartItemCount: 0,
};

describe("Header Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HeaderComponent {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render logo and cart icon", () => {
    expect(wrapper.containsMatchingElement(<ImageComponent />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<ShoppingCart />)).toEqual(true);
    expect(wrapper.find(".items-count").text()).toEqual("0");
  });

  it("should call clickHandler when click on cart Icon", () => {
    const cartIconElement = wrapper.find(".header__item").at(1);
    cartIconElement.simulate("click");
    expect(props.cartToggleHandler).toHaveBeenCalledTimes(1);
    expect(props.cartToggleHandler).toHaveBeenCalledWith(true);
  });
});
