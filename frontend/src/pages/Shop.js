import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
import Newsletter from "../components/Newsletter/Newsletter";
import { useLocation } from "react-router-dom";

const Shop = (props) => {
  const { state } = useLocation();
  const { setIsLogin } = props;
  if (state !== null) {
    const { isLogin } = state;
    if (isLogin) {
      setIsLogin(isLogin);
    }
  }
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
    </div>
  );
};

export default Shop;
