import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import emptyCart from '../../assets/cart-empty.jpg';

import './cart-dropdown.styles.scss';

const CartDropDown = ({ cartItems, history, dispatch }) => (
  <CartDropDownDiv className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <div className="empty-cart">
          <img src={emptyCart} alt="empty cart" />
        </div>
      )}
    </div>

    {cartItems.length ? (
      <CustomButton
        inverted
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    ) : null}
  </CartDropDownDiv>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const CartDropDownDiv = styled.div`
  background: ${({ theme }) => theme.body};
`;

export default withRouter(connect(mapStateToProps)(CartDropDown));
