import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ProductListComponent from "./ProductListComponent";
import ProductCardComponent from "../productCardComponent/ProductCardComponent";

configure({ adapter: new Adapter() });

describe("ProductListComponent", () => {
  let wrapper;

  const props = {
    productList: [
      {
        id: 1,
        price: 100,
        quantity: 3,
        name: "Product 1",
        description: "some product",
        image: "https://xyz/image1.jpg",
      },
      {
        id: 2,
        price: 100,
        quantity: 3,
        name: "Product 2",
        description: "some product",
        image: "https://xyz/image3.jpg",
      },
      {
        id: 3,
        price: 100,
        quantity: 3,
        name: "Product 3",
        description: "some product",
        image: "https://xyz/image3.jpg",
      },
    ],
    action: "REMOVE",
    productActionctionHandler: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<ProductListComponent {...props} />);
  });

  it("should render ProductCardComponent for all list items", () => {
    expect(wrapper.find(ProductCardComponent).length).toEqual(3);
  });
});
