import React from "react";
import "./Newsletter.css";
import { Container, Button, Form, InputGroup } from "react-bootstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div class="newsletter-subscribe">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Your Email Id"
              aria-label="Your Email Id"
              aria-describedby="basic-addon2"
            />
            <Button id="button-subscribe">Subscribe</Button>
          </InputGroup>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
