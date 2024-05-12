import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import "./ProductDisplay.css";
import starIcon from "../../assets/img/star_icon.png";
import starDullIcon from "../../assets/img/star_dull_icon.png";
import { FormatRupiah } from "@arismun/format-rupiah";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const navigate = useNavigate();

  const addToCartHandler = async (productId) => {
    try {
      const response = await axios.get("http://localhost:4000/token", {
        withCredentials: true,
      });
      addToCart(productId, response.data.accessToken);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const productSize = [
    "EU 35.5",
    "EU 36",
    "EU 36.5",
    "EU 37.5",
    "EU 38",
    "EU 38.5",
    "EU 39",
    "EU 40",
    "EU 40.5",
    "EU 41",
    "EU 42",
    "EU 42.5",
    "EU 43",
    "EU 44",
    "EU 44.5",
  ];

  return (
    <section className="product-display">
      <Row>
        <Col md={7} className="d-flex p-0 display-left">
          <div className="thumbnail-img d-flex flex-column">
            <img src={product.image} alt="Thumb-1" className="px-2 pb-2" />
            <img src={product.image} alt="Thumb-2" className="px-2 pb-2" />
            <img src={product.image} alt="Thumb-3" className="px-2 pb-2" />
            <img src={product.image} alt="Thumb-4" className="px-2" />
          </div>
          <div className="main-image d-flex">
            <img src={product.image} alt="Main" />
          </div>
        </Col>
        <Col md={5} className="ps-5 display-right">
          <h1 className="product-name text-start">{product.name}</h1>
          <div className="product-rating d-flex align-items-center">
            <img src={starIcon} alt="Star" />
            <img src={starIcon} alt="Star" />
            <img src={starIcon} alt="Star" />
            <img src={starIcon} alt="Star" />
            <img src={starDullIcon} alt="Star" />
            <p className="ms-2 mb-0 reviews">(122)</p>
          </div>
          <div className="product-prices text-start mt-4">
            {product.old_price === product.new_price ? (
              <p className="new-price">
                <FormatRupiah value={product.new_price} />
              </p>
            ) : (
              <>
                <p className="old-price me-3">
                  <FormatRupiah value={product.old_price} />
                </p>
                <p className="new-price">
                  <FormatRupiah value={product.new_price} />
                </p>
              </>
            )}
          </div>
          <div className="product-description mt-4 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            culpa earum adipisci ducimus doloribus laudantium atque fugiat
            inventore nemo dolorem.
          </div>
          <div className="product-sizes mt-4 text-start">
            <h1>Select Size</h1>
            <div className="size-list d-flex flex-wrap mt-3">
              {productSize.map((size) => (
                <>
                  <div className="size">{size}</div>
                </>
              ))}
            </div>
            <div className="add-to-cart-btn mt-3">
              <button onClick={() => addToCartHandler(product.id)}>
                ADD TO CART
              </button>
            </div>
            <p className="product-category mt-5 mb-2">
              <span>Category :</span>
              {` ${product.category}`}
            </p>
            <p className="product-tags mb-0">
              <span>Tags :</span> Sneakers, Latest
            </p>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ProductDisplay;
