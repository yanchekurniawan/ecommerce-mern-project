import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import instagramIcon from "../../assets/img/instagram_icon.png";
import pinterestIcon from "../../assets/img/pintester_icon.png";
import whatsappIcon from "../../assets/img/whatsapp_icon.png";

const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <Row className="d-flex flex-column">
          <Col>
            <div class="footer-brand d-flex align-items-center justify-content-center mb-4">
              <img src={logo} alt="Footer Brand" />
              <h1 className="ms-3 mb-0">SHOPPER</h1>
            </div>
          </Col>
          <Col>
            <div class="footer-link d-flex justify-content-center mb-3">
              <ul>
                <li className="link-item">Company</li>
              </ul>
              <ul>
                <li className="link-item">Products</li>
              </ul>
              <ul>
                <li className="link-item">Offices</li>
              </ul>
              <ul>
                <li className="link-item">About</li>
              </ul>
              <ul>
                <li className="link-item">Contact</li>
              </ul>
            </div>
          </Col>
          <Col>
            <div class="footer-social d-flex justify-content-center">
              <ul>
                <li social-link>
                  <img src={instagramIcon} alt="Instagram Icon" />
                </li>
              </ul>
              <ul>
                <li social-link>
                  <img src={pinterestIcon} alt="Pinterest Icon" />
                </li>
              </ul>
              <ul>
                <li social-link>
                  <img src={whatsappIcon} alt="Whatsapp Icon" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
