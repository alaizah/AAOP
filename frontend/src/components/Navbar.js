import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar(props) {
  //change the state of the menu
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  //reverse the state of the above funstion
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  //handles the resizing of window
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to={props.home}
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            NOTICE BOARD
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to={props.notices}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                {props.page2}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={props.map}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                MAP
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={props.profile}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                {props.page4}
              </Link>
            </li>
          </ul>
          {button && (
            <Button page="/" buttonStyle="btn--outline">
              SIGN OUT
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
