import { all, call, takeLatest, put } from "redux-saga/effects";
import { UserActionTypes } from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearUserCart() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserCart);
}

export function* onSuccessfulPayment() {
  yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearUserCart);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onSuccessfulPayment)]);
}
