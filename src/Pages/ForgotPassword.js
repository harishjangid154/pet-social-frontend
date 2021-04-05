import React, { Component } from "react";
import PasswordForm from "../Components/PasswordForm";

export default class ForgotPassword extends Component {
  render() {
    return (
      <>
        {/* <div class="popup_sec" id="pop_forgt">
          <div class="clos_btn">
            <img src="images/clos.png" alt="" id="clos_pop" />
          </div>
          <div class="pop_hdr">
            A mail has been send to your e-mail Id for Reset Password Link
          </div>
          <div class="man_contnt">
            <span>Please Check Your Mail Box!</span>
            <input type="submit" value="Ok" />
          </div>
        </div> */}
        <div class="container">
          <div class="content">
            <div class="content_rgt">
              <PasswordForm />
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
      </>
    );
  }
}
