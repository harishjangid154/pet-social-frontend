import React, { Component } from "react";
import Profile from "../Components/Profile";
import Category from "../Components/Category";
import Featured from "../Components/Featured";
import store from "../redux";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";

import UploadPost from "../Components/UploadPost";
import ShowPosts from "../Components/ShowPosts";

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
    };
  }

  async componentWillMount() {
    console.log(store.getState().userActions);
    console.log(store.getState().userActions.user.userName);
    this.setState({ userName: store.getState().userActions.user.userName });
    if (!store.getState().userActions.isAuthenticated) {
      const token = document.cookie;
      console.log(token);
      if (token) {
        const userToken = token
          .split("; ")
          .find((cookie) => cookie.startsWith("jwt-token="))
          .split("=")[1];
        const user = jwt.decode(userToken);
        console.log(user, token);
        store.dispatch({ type: "SET_USER", payload: user });
      } else {
        this.props.history.push("/login");
      }
    }
    // store.dispatch({ type: "SHOW_NOTIFICATION", payload: "Profile" });
    console.log("Component called");
  }

  postpopup() {
    document.querySelector(".popup").classList.remove("hide");
  }
  closePopup() {
    document.querySelector(".popup").classList.add("hide");
  }

  render() {
    console.log("INSIDE");
    return (
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_btn">
              <span className="rght_btn_icon">
                <img src="images/btn_iconb.png" alt="up" />
              </span>
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>
              <a href="#" onClick={this.postpopup}>
                Upload Post
              </a>
            </div>
            <div className="rght_btn">
              <span className="rght_btn_icon">
                <img src="images/btn_icona.png" alt="up" />
              </span>
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>
              <a href="#">Invite Friends</a>
            </div>
            {/* POPUP WINDOW */}
            <div className="popup hide">
              <div className="popup_inner">
                <UploadPost />
                <button className="popup_button" onClick={this.closePopup}>
                  X
                </button>
              </div>
            </div>
            {/* CATEGORY & FEATURED PETS */}

            <Category />
            <Featured />
          </div>
          <div className="content_lft">
            {/* Opetion to filter feed */}
            <Profile />

            <ShowPosts />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TimeLine);
