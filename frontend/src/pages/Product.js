import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Breadcums from "../components/Breadcums/Breadcums";
import { Container } from "react-bootstrap";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { allProductData } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProductData.find((item) => item.id === Number(productId));

  return (
    <Container>
      <Breadcums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts allProducts={allProductData} product={product} />
    </Container>
  );
};

export default Product;
