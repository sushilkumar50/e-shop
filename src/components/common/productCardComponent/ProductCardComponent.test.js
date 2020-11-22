import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ProductCardComponent from "./ProductCardComponent";
import ImageComponent from "../imagecomponent/ImageComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";

configure({ adapter: new Adapter() });

const props = {
  product: {
    id: 1,
    price: 100,
    quantity: 3,
    name: "Product",
    description: "some product",
    image: "https://xyz/image.jpg",
  },
  productActionHandler: jest.fn(),
  action: "REMOVE",
};

describe("ProductCardComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductCardComponent {...props} />);
  });

  it("should render product image component action button along with product info", () => {
    expect(wrapper.containsMatchingElement(<ImageComponent />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<ButtonComponent />)).toEqual(true);
    expect(wrapper.find(ImageComponent).props()).toStrictEqual({
      src: "https://xyz/image.jpg",
      alt: "Product image",
      width: "100%",
      height: 300,
    });
    expect(wrapper.find(ButtonComponent).props().disabled).toEqual(false);
    expect(wrapper.find(".content__name").text()).toEqual("Product");
    expect(wrapper.find(".content__info-price").text()).toEqual("Rs. 100");
    expect(wrapper.find(".content__info-quantity").text()).toEqual("Qty: 3");
  });

  it("should call props productActionHandler when button onClick handler Called", () => {
    wrapper.find(ButtonComponent).props().clickHandler();
    expect(props.productActionHandler).toHaveBeenCalledTimes(1);
    expect(props.productActionHandler).toHaveBeenCalledWith(1);
  });
});
