import React, { Component } from "react";
import Category from "../Components/Category";
import Featured from "../Components/Featured";
import Opetions from "../Components/Opetions";
import Post from "../Components/Post";
import store from "../redux";
import { useHistory, Link } from "react-router-dom";
import { api_base_url } from "../BaseURL/baseUrl";
import UploadPost from "../Components/UploadPost";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  async fetchPosts() {
    console.log("called");
    const user = store.getState().userActions.user;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    };
    const url = api_base_url + "post/:" + user.userName;
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.post);
        if (data.post === "Posts unavailable") {
          store.dispatch({ type: "SET_POSTS", payload: [] });
        } else store.dispatch({ type: "SET_POSTS", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    if (!store.getState().userActions.isAuthenticated) {
      this.props.history.push("/login");
    } else this.fetchPosts();
    // console.log("Component called");
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

            {/* {store.getState().posts.map((post) => (
              <Post post />
            ))} */}
            {/* {console.log(store.getState())} */}
            {store.getState().postActions.posts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
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
