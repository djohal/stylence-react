import React from "react";
import { shallow } from "enzyme";
import { ShopPage } from "./shop.component";

it("should render shop component", () => {
  const props = {
    match: "",
    fetchCollectionsStart: jest.fn(),
  };
  expect(shallow(<ShopPage {...props} />)).toMatchSnapshot();
});
