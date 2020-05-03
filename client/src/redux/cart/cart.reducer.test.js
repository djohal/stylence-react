import { CartActionTypes } from "./cart.types";
import * as actions from "./cart.actions";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "./cart.utils";

import cartReducer from "./cart.reducer";

describe("Cart Reducer", () => {
  let INITIAL_STATE;
  beforeEach(() => {
    INITIAL_STATE = {
      hidden: true,
      cartItems: [],
    };
  });

  it("should return the initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should toggle hidden with TOGGLE_CART_HIDDEN action", () => {
    expect(
      cartReducer(
        INITIAL_STATE,
        actions.toggleCartHidden({
          type: CartActionTypes.TOGGLE_CART_HIDDEN,
        })
      )
    ).toEqual({
      hidden: !INITIAL_STATE.hidden,
      cartItems: [],
    });
  });

  describe("add item", () => {
    let mockItem, state;
    beforeEach(() => {
      mockItem = {
        id: 1,
        name: "Cart Item",
      };

      state = {
        hidden: true,
        cartItems: [mockItem],
      };
    });

    it("should add item to the cart with ADD_ITEM action", () => {
      state.cartItems[0].quantity = 1;
      expect(cartReducer(INITIAL_STATE, actions.addItem(mockItem))).toEqual(
        state
      );
    });

    it("should increase item count when same item is added", () => {
      mockItem.quantity = 1;
      expect(
        cartReducer(state, actions.addItem(mockItem)).cartItems[0].quantity
      ).toBe(2);
    });
  });

  describe("remove item", () => {
    let mockItem, state;
    beforeEach(() => {
      mockItem = {
        id: 1,
        name: "Cart Item",
        quantity: 1,
      };

      state = {
        hidden: true,
        cartItems: [mockItem],
      };
    });

    it("should remove item from the cart with REMOVE_ITEM action", () => {
      expect(cartReducer(state, actions.removeItem(mockItem))).toEqual(
        INITIAL_STATE
      );
    });

    it("should decrease the quantity when REMOVE_ITEM action is triggered", () => {
      mockItem.quantity = 2;
      expect(
        cartReducer(state, actions.removeItem(mockItem)).cartItems[0].quantity
      ).toBe(1);
    });
  });

  describe("clear item from cart", () => {
    let mockItem, state;
    beforeEach(() => {
      mockItem = {
        id: 1,
        name: "Cart Item",
        quantity: 2,
      };

      state = {
        hidden: true,
        cartItems: [
          mockItem,
          {
            id: 2,
            name: "Second Cart Item",
            quantity: 1,
          },
        ],
      };
    });

    it("should clear item from the cart with CLEAR_ITEM_FROM_CART action", () => {
      expect(
        cartReducer(state, actions.clearItemFromCart(mockItem)).cartItems[0]
      ).toEqual(state.cartItems[1]);
    });
  });

  describe("clear cart", () => {
    let mockItem, state;
    beforeEach(() => {
      state = {
        hidden: true,
        cartItems: [
          {
            id: 1,
            name: "Cart Item",
            quantity: 2,
          },
          {
            id: 2,
            name: "Second Cart Item",
            quantity: 1,
          },
        ],
      };
    });

    it("should clear all items with CLEAR_CART action", () => {
      expect(cartReducer(state, actions.clearCart()).cartItems.length).toEqual(
        0
      );
    });
  });

  it("should set cart from firebase", () => {
    let cartItems = [
      {
        id: 1,
        name: "Cart Item",
        quantity: 2,
      },
      {
        id: 2,
        name: "Second Cart Item",
        quantity: 1,
      },
    ];
    expect(
      cartReducer(INITIAL_STATE, actions.setCartFromFirebase(cartItems))
        .cartItems
    ).toEqual(cartItems);
  });
});
