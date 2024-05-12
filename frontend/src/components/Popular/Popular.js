import React, { useEffect, useState } from "reactimport";
import "./Popular.css";
// import dataProduct from "../../assets/img/data";
import Item from "../Item/Item";
import { Container } from "react-bootstrap";
import axios from "axios";

const Popular = () => {
  const [dataProduct, setDataProduct] = useState([]);

  const getDataProduct = async () => {
    try {
      const response = await axios.get("http://localhost:4000/popular-search");
      if (response.data.success) {
        setDataProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <section className="popular d-flex flex-column align-items-center">
      <h1>Popular Search</h1>
      <div class="underline"></div>
      <div class="popular-item">
        <Container className="d-grid">
          {dataProduct.map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                newPrice={item.new_price}
                oldPrice={item.old_price}
              ></Item>
            );
          })}
        </Container>
      </div>
    </section>
  );
};

export default Popular;
