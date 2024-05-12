import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Navbar as Nv, Container, Nav } from "react-bootstrap";
import logo from "../../assets/img/Logo/logo-white-2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Cart3 } from "react-bootstrap-icons";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Navbar = (props) => {
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalCartItems, setCartItems } = useContext(ShopContext);
  const { isLogin, setIsLogin } = props;

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

  const getCartItems = async () => {
    /* console.log("TOKEN: ", token); */
    try {
      const response = await axios.get("http://localhost:4000/cart", {
        headers: {
          "x-access-token": `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      Swal.fire({
        text: "Login Required CUY",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    if (isLogin) {
      /* console.log("TOKEN REFRESHED"); */
      refreshToken();
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin && token !== "") {
      /* console.log("CART ITEMS GETED"); */
      getCartItems();
    }
  }, [isLogin, token]);

  const axiosIntercept = axios.create();

  axiosIntercept.interceptors.request.use(
    async (config) => {
      if (isLogin) {
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
      }
    },
    (err) => Promise.reject(err)
  );

  const logoutHandler = async () => {
    try {
      const response = await axios.delete("http://localhost:4000/sign-out", {
        withCredentials: true,
      });

      if (response.status === 200) {
        Cookies.set("login", false);
        navigate("/", {
          state: {
            isLogin: false,
          },
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener("scroll", onScroll);

    return window.removeEventListener("scroll", onscroll);
  }, []);

  return (
    <Nv expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container className="px-md-0">
        <Nv.Brand className="me-auto ">
          <div className="nav-logo d-flex align-items-center">
            <img src={logo} alt="Logo" />
          </div>
        </Nv.Brand>
        <Nv.Toggle
          aria-controls="basic-navbar-nav"
          aria-expanded={ariaExpanded}
          onClick={() =>
            ariaExpanded === false
              ? setAriaExpanded(true)
              : setAriaExpanded(false)
          }
        />
        <Nv.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink to="/" className="nav-link">
              Shop
            </NavLink>
            <NavLink to="/lifestyle" className="nav-link">
              Lifestyle
            </NavLink>
            <NavLink to="/running" className="nav-link">
              Running
            </NavLink>
            <NavLink to="/sandal-and-flip-flops" className="nav-link">
              Sandal & Flip Flops
            </NavLink>
          </Nav>
          <div className="nav-login-cart d-flex align-items-center ms-auto">
            {isLogin ? (
              <NavLink>
                <button className="mx-3" onClick={() => logoutHandler()}>
                  Logout
                </button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <button className="mx-3">Login</button>
              </NavLink>
            )}

            <NavLink to="/cart" className="cart-link d-flex align-items-center">
              <Cart3 size={25} color="#fff" />
              <div className="nav-cart-counter d-flex align-items-center justify-content-center">
                {getTotalCartItems()}
              </div>
            </NavLink>
          </div>
        </Nv.Collapse>
      </Container>
    </Nv>
  );
};

export default Navbar;
