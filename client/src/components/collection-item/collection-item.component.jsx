import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addItem, toggleCartHidden } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CollectionItem = ({ item, addItem, cartItemsCount, toggleCart }) => {
  const { name, imageUrl, price } = item;

  function addItemToCart() {
    addItem(item);
    if (cartItemsCount === 0) {
      toggleCart();
    }
  }

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <CustomButton inverted onClick={() => addItemToCart()}>
          ADD TO CART
        </CustomButton>
      </div>
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  toggleCart: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
