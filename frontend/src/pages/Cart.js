import React from "react";
import CartItems from "../components/CartItems/CartItems";

const Cart = (props) => {
  const { isLogin } = props;
  return <CartItems isLogin={isLogin} />;
};

export default Cart;
