import React, { Component } from "react";
import Category from "../Components/Category";
import Featured from "../Components/Featured";
import Opetions from "../Components/Opetions";
import store from "../redux";
import UploadPost from "../Components/UploadPost";
import { connect } from "react-redux";
import ShowPosts from "../Components/ShowPosts";
import jwt from "jsonwebtoken";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
    };
    this.re = React.createRef(true);
  }
  componentDidMount() {
    console.log(this.re.current);
    const token = document.cookie;
    console.log(token);
    if (token) {
      const user = jwt.decode(token.split("=")[1]);
      console.log(user, token);
      store.dispatch({ type: "SET_USER", payload: user });
    }
    if (!store.getState().userActions.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.re.current = false;
  }
  postpopup() {
    document.querySelector(".popup").classList.remove("hide");
  }
  closePopup() {
    document.querySelector(".popup").classList.add("hide");
  }
  render() {
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
            <Opetions />
            {/* Feed Posts */}
            {console.log("Home")}
            {this.re.current ? window.scrollTo(0, 0) : null}
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

export default connect(mapStateToProps)(Home);
