import React from "react";
import "./Offers.css";
import { Container, Row, Col } from "react-bootstrap";
import offersImg from "../../assets/img/exclusive_image.png";

const Offers = () => {
  return (
    <section className="offers">
      <Container fluid={true}>
        <Row className="d-flex align-items-center">
          <Col xs={12} md={7} xl={6} className="text-center text-md-start">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
          </Col>
          <Col xs={12} md={5} xl={6} className="offers-image">
            <img src={offersImg} alt="Offers" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Offers;
