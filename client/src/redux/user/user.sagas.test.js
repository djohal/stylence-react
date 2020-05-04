import { put, call } from "redux-saga/effects";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
} from "./user.actions";

import {
  createUserProfileDocument,
  getCurrentUser,
  auth,
} from "../../firebase/firebase.utils";
import {
  getSnapShotFromUserAuth,
  signInWithGoogle,
  signInWithEmail,
  isUserAuthenticated,
  signOut,
  signUp,
} from "./user.sagas";

import { testSaga } from "redux-saga-test-plan";

describe("getSnapShotFromUserAuth", () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};
  const generator = getSnapShotFromUserAuth(mockUserAuth, mockAdditionalData);

  it("should call createUserProfileDocument", () => {
    expect(generator.next().value).toEqual(
      call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
    );
  });

  it("should check for signInSuccess", () => {
    let userRef = {
      get: () => {
        return { id: 1, data: () => {} };
      },
    };

    let userSnapshot = {
      id: 1,
      data: () => {},
    };
    generator.next(userRef);

    expect(generator.next(userSnapshot).value).toEqual(
      put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    );
  });

  it("should check for signInFailure", () => {
    expect(generator.throw("error").value).toEqual(put(signInFailure("error")));
  });
});

describe("signInWithGoogle", () => {
  const generator = signInWithGoogle();

  it("sign in with popup", () => {
    let googleProvider = {};

    jest.spyOn(auth, "signInWithPopup").mockImplementation(() => {});

    expect(generator.next().value).toEqual(
      auth.signInWithPopup(googleProvider)
    );
  });

  it("calls getSnapShotFromUserAuth", () => {
    let user = {};
    generator.next(user);

    let getSnapShotFromUserAuth = jest.fn();
    expect(generator.next().value).toEqual(getSnapShotFromUserAuth(user));

    expect(getSnapShotFromUserAuth).toHaveBeenCalledTimes(1);
  });
});

describe("signInWithEmail", () => {
  const payload = {
    email: "test@mail.ca",
    password: "pass123",
  };

  it("should call getSnapShotFromUserAuth", () => {
    let userData = {
      user: {
        id: 1,
        name: "jon",
      },
    };

    let { user } = userData;

    jest
      .spyOn(auth, "signInWithEmailAndPassword")
      .mockImplementation(() => userData);

    let saga = testSaga(signInWithEmail, { payload });
    saga
      .next()
      .next({ user })
      .call(getSnapShotFromUserAuth, user)
      .next()
      .isDone();
  });
});

describe("isUserAuthenticated", () => {
  let userAuth = {};

  it("should getSnapShotFromUserAuth if user is authenticated ", () => {
    let saga = testSaga(isUserAuthenticated);
    saga
      .next()
      .call(getCurrentUser)
      .next(userAuth)
      .call(getSnapShotFromUserAuth, userAuth)
      .next()
      .isDone();
  });

  it("should return undefined if user is not authenticated ", () => {
    userAuth = null;
    let saga = testSaga(isUserAuthenticated);
    saga
      .next()
      .call(getCurrentUser)
      .next(userAuth)
      .inspect((isUserAuthenticated) => {
        expect(isUserAuthenticated).toEqual(undefined);
      });
  });

  it("should catch error on failure", () => {
    let error = new Error("error");
    let saga = testSaga(isUserAuthenticated);
    saga.next().throw(error).put(signInFailure(error)).next().isDone();
  });
});

describe("signOut", () => {
  it("should signout on success", () => {
    let saga = testSaga(signOut);
    jest.spyOn(auth, "signOut");
    saga.next().next().put(signOutSuccess()).next().isDone();
  });

  it("should catch error on failure", () => {
    let error = new Error("error");
    let saga = testSaga(signOut);
    saga.next().throw(error).put(signOutFailure(error)).next().isDone();
  });
});

describe("signUp", () => {
  let payload = {
    email: "test@mail.ca",
    password: "test123",
    displayName: "test",
  };
  it("should sign up on success", () => {
    let userData = {
      user: {
        id: 1,
        name: "test",
      },
    };

    let { user } = userData;

    let addtionalData = {
      displayName: "test",
    };

    jest
      .spyOn(auth, "createUserWithEmailAndPassword")
      .mockImplementation(() => userData);

    let saga = testSaga(signUp, { payload });
    saga
      .next()
      .next({ user })
      .put(signUpSuccess({ user, addtionalData }))
      .next()
      .isDone();
  });

  it("should catch error on failure", () => {
    let error = new Error("error");
    let saga = testSaga(signUp, { payload });
    saga.next().throw(error).put(signUpFailure(error)).next().isDone();
  });
});
