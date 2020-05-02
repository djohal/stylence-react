import React from "react";
import { shallow } from "enzyme";
import SignInAndSignUpPage from "./sign-in-and-sign-up.component";

it("should render sign-in-and-sign-up component", () => {
  expect(shallow(<SignInAndSignUpPage />)).toMatchSnapshot();
});
