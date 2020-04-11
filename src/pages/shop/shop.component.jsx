import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./shop.styles.scss";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { selectShopCollections } from "../../redux/shop/shop.selectors";

const ShopPage = ({ collections }) => (
  <div className="shop-page">
    <h1>Collections</h1>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps)(ShopPage);
