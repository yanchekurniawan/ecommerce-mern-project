import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { Container } from "react-bootstrap";
import { FormatRupiah } from "@arismun/format-rupiah";
import { TrashFill } from "react-bootstrap-icons";
import { ShopContext } from "../../context/ShopContext";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

const CartItems = (props) => {
  const {
    allProductData,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    cartItems,
    getTotalPrice,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  /* JWT */
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState();
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4000/token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);

      const decoded = jwtDecode(token);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const axiosIntercept = axios.create();

  axiosIntercept.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:4000/token");
        config.headers[
          "x-access-token"
        ] = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setExpired(decoded.exp);
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  return (
    <section className="cart-items">
      <Container fluid={true}>
        <div className="cart-items-header cart-items-format">
          <p>Product</p>
          <p>Product Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {allProductData.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div className="cart-items-body">
                <div className="cart-items-format">
                  <img
                    src={item.image}
                    alt="Product Icons"
                    className="product-icons"
                  />
                  <p className="product-name">{item.name}</p>
                  <p className="product-price">
                    <FormatRupiah value={item.new_price} />
                  </p>
                  <div className="product-quantity d-flex align-items-center justify-content-center">
                    <button
                      className="minus me-3"
                      onClick={() => removeFromCart(item.id, token)}
                    >
                      -
                    </button>
                    <p className="quantity">{cartItems[item.id]}</p>
                    <button
                      className="plus ms-3"
                      onClick={() => addToCart(item.id, token)}
                    >
                      +
                    </button>
                  </div>
                  <p className="product-total">
                    <FormatRupiah value={item.new_price * cartItems[item.id]} />
                  </p>
                  <button
                    className="product-remove"
                    onClick={() => removeAllFromCart(item.id, token)}
                  >
                    <TrashFill size={20} color="#e71818" />
                  </button>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cart-total d-flex justify-content-end align-items-center">
          <div className="total d-flex align-items-center">
            <p className="me-2 mb-0">Total:</p>
            <span className="total-value">
              <FormatRupiah value={getTotalPrice()} />
            </span>
          </div>
          <div className="ms-3 checkout">
            <NavLink to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </NavLink>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CartItems;
