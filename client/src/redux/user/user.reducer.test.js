import userReducer from "./user.reducer";
import * as actions from "./user.actions";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

describe("User Reducer", () => {
  let INITIAL_STATE;

  beforeEach(() => {
    INITIAL_STATE = {
      currentUser: null,
      error: null,
    };
  });

  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should update currentUser state after SIGN_IN_SUCCESS", () => {
    let mockPayload = {
      id: 1,
      name: "test",
    };
    expect(
      userReducer(INITIAL_STATE, actions.signInSuccess(mockPayload)).currentUser
    ).toEqual(mockPayload);
  });

  it("should update currentUser state after SIGN_UP_SUCCESS", () => {
    let mockPayload = {
      user: {
        id: 1,
        email: "test@mail.ca",
      },
      addtionalData: {
        displayName: "test",
      },
    };
    expect(
      userReducer(INITIAL_STATE, actions.signUpSuccess(mockPayload)).currentUser
    ).toEqual(mockPayload);
  });
  
  it("should empty currentUser state after SIGN_OUT_SUCCESS", () => {
    let mockPayload = {
      user: {
        id: 1,
        email: "test@mail.ca",
      },
      addtionalData: {
        displayName: "test",
      },
    };

    let newState = { ...INITIAL_STATE };
    newState.currentUser = mockPayload;

    expect(userReducer(newState, actions.signOutSuccess()).currentUser).toEqual(
      INITIAL_STATE.currentUser
    );
  });
});
