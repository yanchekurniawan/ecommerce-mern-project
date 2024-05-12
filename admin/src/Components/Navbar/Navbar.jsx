import React, { useState } from "react";
import "./Navbar.css";
import { Navbar as Nv, Container } from "react-bootstrap";
import logo from "../../assets/Logo/logo-white-2.png";
import avatar from "../../assets/avatar.jpg";
import { ChevronDown } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [profileDropown, setProfileDropdown] = useState(false);

  return (
    <Nv expand="lg">
      <Container fluid={true} className="ps-3 pe-3 pe-lg-5">
        <Nv.Brand href="#home">
          <img src={logo} alt="Brand" />
        </Nv.Brand>
        <div className="navbar-profile">
          <div
            className="profile d-flex align-items-center"
            onClick={() =>
              profileDropown
                ? setProfileDropdown(false)
                : setProfileDropdown(true)
            }
          >
            <img src={avatar} alt="Avatar" />
            <span>Admin</span>
            <ChevronDown size={15} color="#fff" />
          </div>
          {profileDropown && (
            <div className="profile-dropdown-menu">
              <NavLink href="">Settings</NavLink>
              <hr className="my-2" />
              <NavLink href="">Logout</NavLink>
            </div>
          )}
        </div>
      </Container>
    </Nv>
  );
};

export default Navbar;
