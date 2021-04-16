import React from "react";

export default function Comment(comment) {
  return (
    <li>
      <div className="list_image">
        <div className="image_sec">
          <img src={comment.comment.user.userImage} alt="user" />
        </div>
        <div className="image_name">{comment.comment.user.userName}</div>
      </div>
      <div className="list_info">{comment.comment.text}</div>
    </li>
  );
}
