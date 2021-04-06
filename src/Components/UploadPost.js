import React, { useRef } from "react";
import store from "../redux";
import { api_base_url } from "../BaseURL/baseUrl";

function UploadPost() {
  console.log("CAlled");
  const headingRef = useRef();
  const bodyRef = useRef();
  const imageRef = useRef();
  const uploadImage = async () => {
    const image = imageRef.current.value;
    console.log(image);
    const url = api_base_url + "post";
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    uploadImage();

    const user = store.getState().userActions.user;
  };
  return (
    <div>
      <span>Image</span>
      <input type="file" ref={imageRef} />
      {""}
      <br />

      <input type="text" placeholder="post Heading" ref={headingRef} />
      <br />
      <input type="text" placeholder="post body" ref={bodyRef} />
      <br />
      <input type="submit" value="submit" onClick={handleSubmit} />
    </div>
  );
}

export default UploadPost;
