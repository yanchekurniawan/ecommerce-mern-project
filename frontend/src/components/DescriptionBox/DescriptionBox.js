import React from "react";
import { Nav, Tab } from "react-bootstrap";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <section className="description-box">
      <Tab.Container id="description-tabs" defaultActiveKey="first">
        <Nav variant="pills" className="nav-pills" id="pills-tab">
          <Nav.Item>
            <Nav.Link eventKey="first">Description</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Reviews (122)</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first" className="text-start">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quo
              beatae, nobis sequi sunt ea consequatur? Laboriosam cumque illum
              delectus voluptas dicta? Unde doloribus repellendus magni. Aliquam
              illum repellat explicabo et provident a culpa, reprehenderit ipsam
              quod veniam. Esse sed beatae sunt? Veritatis earum quos doloremque
              numquam repudiandae dolorem in.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
              incidunt soluta culpa dolor temporibus modi placeat numquam,
              tenetur error voluptatem similique nobis. Reiciendis voluptatem in
              culpa repellat eum doloribus pariatur.
            </p>
          </Tab.Pane>
          <Tab.Pane eventKey="second" className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            distinctio?
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </section>
  );
};

export default DescriptionBox;
