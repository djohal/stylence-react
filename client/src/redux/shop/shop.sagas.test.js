import { takeLatest, call, put } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

import { fetchCollectionsAsync, fetchCollectionsStart } from "./shop.sagas";

import { testSaga } from "redux-saga-test-plan";

describe("fetch collections start saga", () => {
  it("should trigger on FETCH_COLLECTIONS_START", () => {
    const generator = fetchCollectionsStart();
    expect(generator.next().value).toEqual(
      takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
    );
  });
});

describe("fetch collections async saga", () => {
  const saga = testSaga(fetchCollectionsAsync);

  it("should call firestore collection ", () => {
    let collectionRef = {
      get: () => {},
    };
    let snapshot = {};
    let collectionsMap = {};
    jest.spyOn(firestore, "collection").mockImplementation(() => collectionRef);
    saga
      .next()
      .next(snapshot)
      .call(convertCollectionsSnapshotToMap, snapshot)
      .next(collectionsMap)
      .put(fetchCollectionsSuccess(collectionsMap))
      .next()
      .isDone();
  });

  it("should catch error on failure", () => {
    let error = {
      message: new Error("error"),
    };
    const saga = testSaga(fetchCollectionsAsync);

    saga
      .next()
      .throw(error)
      .put(fetchCollectionsFailure(error.message))
      .next()
      .isDone();
  });
});
