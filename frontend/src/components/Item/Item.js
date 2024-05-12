import React from "react";
import "./Item.css";
import { Card } from "react-bootstrap";
import { FormatRupiah } from "@arismun/format-rupiah";
import { NavLink } from "react-router-dom";

const Item = (props) => {
  return (
    <div class="item">
      <Card style={{ width: "15rem" }}>
        <NavLink
          to={`/product/${props.id}`}
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "instant",
            });
          }}
        >
          <Card.Img variant="top" src={props.image} />
        </NavLink>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text className="d-flex justify-content-start flex-wrap">
            {props.newPrice === props.oldPrice ? (
              <p className="item-price-new pe-3">
                <FormatRupiah value={props.newPrice} />
              </p>
            ) : (
              <>
                <p className="item-price-new pe-3">
                  <FormatRupiah value={props.newPrice} />
                </p>
                <p className="item-price-old">
                  <FormatRupiah value={props.oldPrice} />
                </p>
              </>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
