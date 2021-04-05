import React, { Component } from "react";
import ResetForm from "../Components/ResetForm";

export default class Reset extends Component {
  render() {
    return (
      <div class="container">
        <div class="content">
          <div class="content_rgt">
            <ResetForm />
          </div>

          <div class="content_lft">
            <h1>Welcome from PPL!</h1>
            <p class="discrptn">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
            <img src="images/img_9.png" alt="" />
          </div>
        </div>
        <div class="clear"></div>
      </div>
    );
  }
}
