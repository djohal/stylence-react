import ShopActionTypes from "./shop.types";
import * as actions from "./shop.actions";
import shopReducer from "./shop.reducer";

describe("Shop Reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      collections: null,
      isFetching: false,
      errorMessage: undefined,
    };
  });

  it("should return the initialState", () => {
    expect(shopReducer(undefined, {})).toEqual(initialState);
  });

  it("should turn isFetching to true when fetching collections", () => {
    expect(
      shopReducer(initialState, actions.fetchCollectionsStart()).isFetching
    ).toEqual(true);
  });

  it("should fetch collections on FETCH_COLLECTIONS_SUCCESS action", () => {
    initialState.isFetching = true;
    let collectionsMap = [
      {
        id: 1,
        name: "beanie",
      },
      {
        id: 2,
        name: "jeans",
      },
    ];
    expect(
      shopReducer(initialState, actions.fetchCollectionsSuccess(collectionsMap))
        .collections
    ).toEqual(collectionsMap);
    expect(
      shopReducer(initialState, actions.fetchCollectionsSuccess(collectionsMap))
        .isFetching
    ).toEqual(false);
  });
});
