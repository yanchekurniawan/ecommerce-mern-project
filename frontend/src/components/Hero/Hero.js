import React from "react";
import "./Hero.css";
import heroImg from "../../assets/img/hero_image.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Col, Container, Row } from "react-bootstrap";

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <Container className="d-flex align-items-center">
        <Row className="d-flex align-items-center">
          <Col
            xs={12}
            sm={12}
            md={5}
            xl={6}
            className="hero-left d-flex justify-content-start align-items-start flex-column"
          >
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
              <p>New collection</p>
              <p>for everyone</p>
            </div>
            <div class="latest-collection-btn">
              <button>
                Latest Collection{" "}
                <ArrowRightCircle size={25} className="ms-2" />
              </button>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={7}
            xl={6}
            className="hero-right d-flex justify-content-center"
          >
            <img src={heroImg} alt="Hero Image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
