import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const ShopMainPage = ({ match }) => (
  <div className="shop-page">
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </Suspense>
  </div>
);

export default ShopMainPage;
