import React, { useContext, useRef, useState } from "react";
import "./CheckoutCart.css";
import { Container, Row, Col, InputGroup, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import { ShopContext } from "../../context/ShopContext";
import { ChevronDown } from "react-bootstrap-icons";

const CheckoutCart = () => {
  const { cartItems, allProductData, getTotalItems, getTotalPrice } =
    useContext(ShopContext);
  const [isActive, setActive] = useState(false);
  const [selected, setSelected] = useState("Choose Delivery");
  const [deliveryPrice, setDeliveryPrice] = useState();
  const deliveryPriceRef = useRef([]);
  const deliveryTypeRef = useRef([]);

  const deliveryTypePrice = [
    {
      type: "Reguler",
      price: 60000,
    },
    {
      type: "Cargo",
      price: 145000,
    },
    {
      type: "Economy",
      price: 45000,
    },
  ];

  const deliveryHandler = (index) => {
    setSelected(deliveryTypeRef.current[index].innerText);
    setDeliveryPrice(
      Number(
        deliveryPriceRef.current[index].innerText
          .substring(3, deliveryPriceRef.current[index].innerText.length)
          .replaceAll(".", "")
      )
    );
    setActive(false);
  };

  return (
    <section className="checkout-cart">
      <Container>
        <Row>
          <Col md={7}>
            <div className="buyer-address text-start">
              <div className="title text-start mb-2">YOUR ADDRESS</div>
              <p className="name mb-2">John Doe</p>
              <p className="address mb-2">
                Jl. Harapan Jaya Nomor 183, RT. 011 RW. 002, Kelurahan Guntung
                Manggis, Kecamatan Landasan Ulin, Kota Banjarbaru, Kalimantan
                Selatan, Landasan Ulin, Kota Banjarbaru, Kalimantan Selatan,
                6287880040184
              </p>
              <NavLink to="/checkout/change-address">
                <button className="change-btn">Change Address</button>
              </NavLink>
            </div>
            {allProductData.map((item) => {
              if (cartItems[item.id] > 0) {
                return (
                  <div className="items-list mt-4">
                    <p className="item-list-title text-start mb-3">Your Item</p>
                    <div className="items-list-format d-flex">
                      <div className="item-image-icon me-3">
                        <img src={item.image} alt="Items Icon" />
                      </div>
                      <div className="item-list-description">
                        <div className="d-flex justify-content-between">
                          <p className="item-name text-start">{item.name}</p>
                          <p className="item-qty-price">
                            {cartItems[item.id]} <span>x</span>{" "}
                            <FormatRupiah value={item.new_price} />
                          </p>
                        </div>
                        <p className="item-size text-start">EU 37</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </Col>
          <Col md={5}>
            <div className="delivery text-start">
              <p className="delivery-title mb-3">Delivery</p>
              <div className="dropdown">
                <div
                  className="dropdown-btn d-flex justify-content-between align-items-center"
                  onClick={() =>
                    isActive ? setActive(false) : setActive(true)
                  }
                >
                  <p>{selected}</p>
                  <ChevronDown />
                </div>
                {isActive && (
                  <div className="dropdown-content">
                    {deliveryTypePrice.map((item, index) => {
                      return (
                        <div className="dropdown-item">
                          <div
                            className="d-flex justify-content-between"
                            onClick={() => deliveryHandler(index)}
                          >
                            <p
                              ref={(el) =>
                                (deliveryTypeRef.current[index] = el)
                              }
                            >
                              {item.type}
                            </p>
                            <p
                              ref={(el) =>
                                (deliveryPriceRef.current[index] = el)
                              }
                            >
                              <FormatRupiah value={item.price} />
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="cart-summary mt-4 text-start">
              <p className="cart-summary-title mb-3">Shopping Summary</p>
              <div className="summary d-flex justify-content-between">
                <p>Total Price {`(${getTotalItems()} item)`}</p>
                <p>
                  <FormatRupiah value={getTotalPrice()} />
                </p>
              </div>
              <hr />
              {deliveryPrice && (
                <>
                  <div className="delivery-total d-flex justify-content-between">
                    <p>Delivery Price</p>
                    <p>
                      <FormatRupiah value={deliveryPrice} />
                    </p>
                  </div>
                  <hr />
                </>
              )}
              <div className="cart-total d-flex justify-content-between">
                <p>Shopping Total</p>
                <p className="fw-bold">
                  {deliveryPrice ? (
                    <FormatRupiah value={getTotalPrice() + deliveryPrice} />
                  ) : (
                    "-"
                  )}
                </p>
              </div>
              <hr />
              <div className="promo-code">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Promo Code"
                    aria-label="Promo Code"
                    aria-describedby="basic-addon2"
                  />
                  <Button id="button-subscribe">Submit</Button>
                </InputGroup>
              </div>
              <hr />
              <div className="payment-method">
                <button>Payment Method</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CheckoutCart;
