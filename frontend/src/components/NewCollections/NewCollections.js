import React, { useEffect, useState } from "react";
// import newCollectionsData from "../../assets/img/new_collections";
import Item from "../Item/Item";
import "./NewCollections.css";
import { Container } from "react-bootstrap";
import axios from "axios";

const NewCollections = () => {
  const [newCollectionsData, setNewCollectionsData] = useState([]);

  const getNewCollections = async () => {
    try {
      const response = await axios.get("http://localhost:4000/new-collections");
      /* console.log(response); */
      if (response.data.success) {
        setNewCollectionsData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewCollections();
  }, []);

  return (
    <section className="new-collections d-flex flex-column align-items-center">
      <h1>New Collections</h1>
      <div class="underline"></div>
      <div class="new-collections-item">
        <Container className="d-grid">
          {newCollectionsData.map((item, index) => {
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

export default NewCollections;
