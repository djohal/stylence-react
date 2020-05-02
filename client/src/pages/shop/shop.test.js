import React from "react";
import { shallow } from "enzyme";
import ShopMainPage from "./shop-main.component";

it("should render shop component", () => {
  expect(shallow(<ShopMainPage match="" />)).toMatchSnapshot();
});
