import React from "react";
import { connect } from "react-redux";

import "./checkout-item.styles.scss";

import { clearItemFromCart } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, clearItemFromCart }) => {
  const { imageUrl, name, quantity, price } = item;
  return (
    <div className="checkout-item">
      <div className="checkout-image">
        <img src={imageUrl} alt="checkout item" />
      </div>
      <span className="description">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">${price}</span>
      <span className="remove" onClick={() => clearItemFromCart(item)}>
        &#10005;
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
