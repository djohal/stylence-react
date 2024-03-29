import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';

import logo from '../../assets/logo.png';
import logoMobile from '../../assets/favicon.png';

import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { toggleCartHidden as toggleCart } from '../../redux/cart/cart.actions';
import ToggleContainer from '../toggler/toggler';

const Header = ({
  currentUser,
  toggleCartHidden,
  signOutStart,
  theme,
  toggleTheme,
  toggleCart,
}) => (
  <div className="header">
    <Link to="/">
      <img className="logo" src={logo} alt="logo" />
      <img className="logo-mobile" src={logoMobile} alt="logo" />
    </Link>
    <div className="options">
      <HeaderLink className="option" to="/shop">
        SHOP
      </HeaderLink>
      {currentUser ? (
        <HeaderLink className="option" to="/" onClick={() => signOutStart()}>
          SIGN OUT
        </HeaderLink>
      ) : (
        <HeaderLink className="option" to="/sign-in">
          SIGN IN
        </HeaderLink>
      )}
      <CartIcon />
      <div
        className={`${toggleCartHidden ? null : 'overlay'}`}
        onClick={() => toggleCart()}
      />
      <hr className="vertical-line option"></hr>
      <ToggleContainer theme={theme} toggleTheme={toggleTheme} />
    </div>
    {toggleCartHidden ? null : <CartDropDown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  toggleCartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleCart: () => dispatch(toggleCart()),
});

const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.text};
`;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
