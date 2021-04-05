import React from "react";

export default function Comment() {
  return (
    <li>
      <div className="list_image">
        <div className="image_sec">
          <img src="images/post_img.png" alt="user" />
        </div>
        <div className="image_name">Bharat</div>
      </div>
      <div className="list_info">
        This is an example of a comment. You can create as many comments like
        this one or sub comments as you like and manage all of your content
        inside your Account.
      </div>
      <input type="button" value="Reply" className="black_btn" />
      <div className="cmnt_div">
        <input type="text" value="Add a Comment" className="cmnt_bx" />
        <input type="submit" className="sub_bttn" value="Submit Comment" />
      </div>
    </li>
  );
}
