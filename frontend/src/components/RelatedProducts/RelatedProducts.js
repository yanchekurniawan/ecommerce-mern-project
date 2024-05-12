import React from "react";
import Item from "../Item/Item";
import "./RelatedProducts.css";
import { Container } from "react-bootstrap";

const RelatedProducts = (props) => {
  const { product, allProducts } = props;
  const firstProductName = product.name.split(" ")[0];
  const relatedProducts = allProducts
    .filter(
      (data) =>
        data.name.includes(firstProductName) &&
        data.category === product.category &&
        !data.name.includes(product.name)
    )
    .slice(0, 4);

  return (
    <section className="related-products">
      <h1 className="text-start">Related Products</h1>
      <div className="the-products">
        <Container className="d-grid">
          {relatedProducts.map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                newPrice={item.new_price}
                oldPrice={item.old_price}
              />
            );
          })}
        </Container>
      </div>
    </section>
  );
};

export default RelatedProducts;
