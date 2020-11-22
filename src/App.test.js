import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./App";
import HomePage from "./containers/HomePage/HomePage";
import HeaderComponent from "./components/common/headerComponent/HeaderComponent";
import FooterComponent from "./components/common/footercomponent/FooterComponent";

configure({ adapter: new Adapter() });

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it("should render Header footer and Home page", () => {
    expect(wrapper.containsMatchingElement(<HomePage />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<HeaderComponent />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<FooterComponent />)).toEqual(true);
  });
});
