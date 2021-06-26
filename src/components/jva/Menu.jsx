import React from "react";
import icon from "../../images/logo.png";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <div className="container">
        <div>
          <img src={icon} className="logo" alt="logo"></img>
          <Link to="/" className="ml-2 nav-title">
            JST
          </Link>
        </div>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Dropdown className="">
          <Dropdown.Toggle>
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/" className="nav-link">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/create" className="nav-link">Create</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/explore" className="nav-link">Explore</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/jastalents" className="nav-link">JasTalents</Link>
            </Dropdown.Item>
            
          </Dropdown.Menu>

        </Dropdown>
      </div>
    </nav>
  );
};

export default Menu;
