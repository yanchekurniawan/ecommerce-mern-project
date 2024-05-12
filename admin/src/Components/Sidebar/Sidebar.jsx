import { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  Cart3,
  ListTask,
  MoonFill,
  SunFill,
  ChevronRight,
  ChevronLeft,
} from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { setTheme } from "./Theme";
import avatar from "../../assets/avatar.jpg";

const Sidebar = () => {
  const [toggleClass, setToggleClass] = useState("light");
  let theme = localStorage.getItem("theme");

  const handleOnClickTheme = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
      setToggleClass("light");
    } else {
      setTheme("theme-dark");
      setToggleClass("dark");
    }
  };

  const [toggleSidebar, setToggleSidebar] = useState(true);
  const toggleSidebarHandler = () => {
    toggleSidebar ? setToggleSidebar(false) : setToggleSidebar(true);
  };

  useEffect(() => {
    const text = document.querySelector(".mode-text");
    if (localStorage.getItem("theme") === "theme-dark") {
      setToggleClass("dark");
      text.innerHTML = "Light Mode";
    } else if (localStorage.getItem("theme") === "theme-light") {
      setToggleClass("light");
      text.innerHTML = "Dark Mode";
    }
  }, [theme]);

  return (
    <section className={toggleSidebar ? "sidebar" : "sidebar close"}>
      <div className="sidebar-profile d-flex align-item-center">
        <img src={avatar} alt="Avatar" />
        <div className="profile d-flex flex-column justify-content-center alignitece">
          <p className="name mb-0">John Doe</p>
          <p className="role mb-0">Admin</p>
        </div>
      </div>
      <div className="separator d-flex justify-content-center">
        <hr />
      </div>
      <div
        className="toggle-sidebar position-absolute d-flex justify-content-center align-items-center"
        onClick={toggleSidebarHandler}
      >
        {toggleSidebar ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
      </div>
      <div className="wrapper d-flex flex-column justify-content-between">
        <div className="sidebar-menu">
          <p className="subtitle">Navigation</p>
          <div className="menu">
            <NavLink to="/add-product" className="d-flex align-items-center">
              <Cart3 size={25} className="me-3" />
              <p className="m-0">Add Product</p>
            </NavLink>
          </div>
          <div className="menu ">
            <NavLink to="/product-list" className="d-flex align-items-center">
              <ListTask size={25} className="me-3" />
              <p className="m-0">Products List</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebar-option">
          <p className="subtitle">Option</p>
          <div className="option d-flex align-items-center position-relative">
            <div className="toggle-icon d-flex flex-column justify-content-center">
              <SunFill size={20} className="sun-icon position-absolute" />
              <MoonFill size={20} className="moon-icon position-absolute" />
            </div>
            <p className="mb-0 mode-text"></p>
            <div className="toggle-switch d-flex align-items-center justify-content-center ps-3 position-absolute">
              {toggleClass === "light" ? (
                <input
                  type="checkbox"
                  id="toggle"
                  className="toggle--checkbox"
                  onClick={handleOnClickTheme}
                />
              ) : (
                <input
                  type="checkbox"
                  id="toggle"
                  className="toggle--checkbox"
                  checked
                  onClick={handleOnClickTheme}
                />
              )}
              <label
                htmlFor="toggle"
                className="toggle--label d-flex position-relative"
              >
                <span className="toggle--label-background"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
