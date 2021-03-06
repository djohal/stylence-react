import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import favicon from "../../assets/favicon.png";
import { paymentSuccess } from "../../redux/user/user.actions";

const StripeCheckoutButton = ({ price, history, clearUserCart }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_I5OdBhM2wASY2WRDLpFoARHE005OaNixXc";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert("Payment Successful!");
        history.push("/");
        clearUserCart();
      })
      .catch((err) => {
        console.log("Payment error: ", JSON.parse(err));
        alert(
          "Oops! Something went wrong. Please sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Stylence"
      billingAddress
      shippingAddress
      image={favicon}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearUserCart: () => dispatch(paymentSuccess()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(StripeCheckoutButton)
);
