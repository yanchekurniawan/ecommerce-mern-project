import React from "react";
import { CaretRightFill } from "react-bootstrap-icons";
import "./Breadcums.css";

const Breadcums = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <div className="breadcums text-start d-flex align-items-center">
      HOME <CaretRightFill color="#e2365e" size={18} className="px-1" /> SHOP{" "}
      <CaretRightFill color="#e2365e" size={18} className="px-1" />{" "}
      {product.category}
      <CaretRightFill color="#e2365e" size={18} className="px-1" />{" "}
      {product.name}
    </div>
  );
};

export default Breadcums;
