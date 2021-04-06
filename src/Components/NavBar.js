import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="navbar navbar-inverse navbar-fixed-top w-100">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              {" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="brand" href="">
              PPL
            </a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src="../images/pic_small.png" />
              </div>
              <div className="pro_txt">
                Me<b className="caret"></b>
              </div>
              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby="dLabel"
              >
                <li>
                  <a tabIndex="-1" href="#">
                    My Profile
                  </a>
                </li>
                <li>
                  <a tabIndex="-1" href="#">
                    Message Box
                  </a>
                </li>
                <li>
                  <a tabIndex="-1" href="#">
                    Change Language
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a tabIndex="-1" href="#">
                    <input type="text" placeholder="search" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active">
                  {" "}
                  <a href="#">Home</a>{" "}
                </li>
                <li className="">
                  {" "}
                  <a href="">E-Coupons</a>{" "}
                </li>
                <li className="">
                  {" "}
                  <a href="">E-Brands</a>{" "}
                </li>
                <li className="">
                  {" "}
                  <a href="">Resuse Market</a>{" "}
                </li>
                <li className="">
                  {" "}
                  <a href="">Lost and Found</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <Header /> */}
    </>
  );
}
