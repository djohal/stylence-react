import React from "react";
import StripeCheckout from "react-stripe-checkout";

import favicon from "../../assets/favicon.png";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_I5OdBhM2wASY2WRDLpFoARHE005OaNixXc";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful!");
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

export default StripeCheckoutButton;
