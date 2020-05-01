import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { UserActionTypes } from "../user/user.types";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import { CartActionTypes } from "./cart.types";
import { selectCurrentUser } from "../user/user.selectors";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCartItems } from "./cart.selectors";

export function* clearUserCart() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearUserCart);
}

export function* onSuccessfulPayment() {
  yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearUserCart);
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);

      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* getCartFromFirebase() {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartSnapshot = yield cartRef.get();
      yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
    } catch (error) {
      console.log(error);
    }
  }
}

export function* onSignInFetchCart() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartInFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onSuccessfulPayment),
    call(onCartChange),
    call(onSignInFetchCart),
  ]);
}
