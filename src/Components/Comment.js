import React from "react";

export default function Comment(comment) {
  console.log(comment);
  return (
    <li>
      <div className="list_image">
        <div className="image_sec">
          <img src="images/post_img.png" alt="user" />
        </div>
        <div className="image_name">Bharat</div>
      </div>
      <div className="list_info">{comment.comment.text}</div>
    </li>
  );
}
