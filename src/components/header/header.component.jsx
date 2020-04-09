import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../assets/logo.png";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";
import CartIcon from "../cart/cart-icon.component";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link to="/">
      <img className="logo" src={logo} alt="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>

      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/sign-in">
          SIGN IN
        </Link>
      )}

      <CartIcon />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
