import React from "react";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item: { imageUrl, name, quantity, price } }) => (
  <div className="checkout-item">
    <div className="checkout-image">
      <img src={imageUrl} alt="checkout item" />
    </div>
    <span className="description">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">${price}</span>
    <span className="remove">&#10005;</span>
  </div>
);

export default CheckoutItem;
