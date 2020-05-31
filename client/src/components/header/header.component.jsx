import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import logo from '../../assets/logo.png';
import logoMobile from '../../assets/favicon.png';

import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import ToggleContainer from '../toggler/toggler';

const Header = ({
  currentUser,
  toggleCartHidden,
  signOutStart,
  theme,
  toggleTheme,
}) => (
  <div className="header">
    <Link to="/">
      <img className="logo" src={logo} alt="logo" />
      <img className="logo-mobile" src={logoMobile} alt="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => signOutStart()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/sign-in">
          SIGN IN
        </Link>
      )}
      <CartIcon />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
