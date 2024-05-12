import React, { useContext } from "react";
import "./css/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import { Container } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import Item from "../components/Item/Item";

const ShopCategory = (props) => {
  const { allProductData } = useContext(ShopContext);

  return (
    <section className="shop-category">
      <Container>
        <div className="banner">
          <img src={props.banner} alt="Banner" />
        </div>
        <div className="shop-category-wrapper d-flex justify-content-between mt-3">
          <div className="shop-category-index">
            <p>
              <span>Showing 1-12</span> out of 36 products
            </p>
          </div>
          <div className="shop-category-sort">
            Sort by <ChevronDown size={15} />
          </div>
        </div>
        <div className="shop-category-products">
          <Container>
            {allProductData.map((item, index) => {
              if (props.category === item.category) {
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
              } else {
                return null;
              }
            })}
          </Container>
        </div>
        <div className="shop-category-more-btn">
          <button className="more-btn">Load More</button>
        </div>
      </Container>
    </section>
  );
};

export default ShopCategory;
