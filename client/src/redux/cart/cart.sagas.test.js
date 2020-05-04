import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { UserActionTypes } from "../user/user.types";
import {
  onSignOutSuccess,
  clearUserCart,
  onSuccessfulPayment,
  updateCartInFirebase,
} from "./cart.sagas";
import * as userSelectors from "../user/user.selectors";

import { recordSaga } from "../recordSaga";
import * as firebase from "../../firebase/firebase.utils";

it("should trigger on SIGN_OUT_SUCCESS", () => {
  const generator = onSignOutSuccess();

  expect(generator.next().value).toEqual(
    takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserCart)
  );
});

it("should trigger on PAYMENT_SUCCESS", () => {
  const generator = onSuccessfulPayment();

  expect(generator.next().value).toEqual(
    takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearUserCart)
  );
});

describe("updateCartInFirebase", () => {
  userSelectors.selectCurrentUser = jest.fn();
  firebase.getUserCartRef = jest.fn();

  it("should get currentUser selector", async () => {
    const gen = updateCartInFirebase();
    const selectDescriptor = gen.next().value;
    expect(selectDescriptor).toEqual(select(userSelectors.selectCurrentUser));
  });

  it("should return undefined when currentUser is not available", async () => {
    const gen = updateCartInFirebase();
    gen.next();
    expect(gen.next().value).toEqual(undefined);
  });
});
