import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import store from "../redux";
import { login } from "../Functions/authFunctions";
import jwt from "jsonwebtoken";
import { api_base_url } from "../BaseURL/baseUrl";
import axios from "axios";

import GoogleLogin from "react-google-login";

function LoginForm() {
  axios.defaults.withCredentials = true;
  const history = useHistory();
  const passwrodRef = useRef();
  const emailRef = useRef();
  const checkBoxRef = useRef(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch(store.dispatch);

  const sendTokenServer = (token) => {
    console.log(token.code);
    axios({
      method: "post",
      url: `${api_base_url}auth/google`,
      data: { code: token.code },
    })
      .then((res) => {
        // console.log(res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleFail = () => {
    console.log("Fail");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const err = {};
    // USER DATA
    let user = {
      email: emailRef.current.value,
      password: passwrodRef.current.value,
      remember: checkBoxRef.current.checked,
    };
    const token = await login(user, setErrors, err);

    if (token) {
      history.push("/");
    }
  };
  return (
    <div className="login_sec">
      <h1>Log In</h1>
      <ul>
        <li>
          <span>{errors.user}</span>
          <span>{errors.email}</span>
          <span>Email-ID</span>
          <input type="text" placeholder="Enter your email" ref={emailRef} />
        </li>
        <li>
          <span>{errors.password}</span>
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            ref={passwrodRef}
          />
        </li>
        <li>
          <input type="checkbox" ref={checkBoxRef} />
          Remember Me
        </li>
        <li>
          <input type="submit" value="Log In" onClick={handleSubmit} />
          <Link to="/forgot">Forgot Password</Link>
        </li>
        <li>
          {/* <input type="submit" value="Google+" onClick={handleGoogleLogin} /> */}
          <GoogleLogin
            clientId="841304087440-2o4esvu70n6s91b881vk9nthgfu0fm3t.apps.googleusercontent.com"
            buttonText="Google+"
            accessType="offline"
            responseType="code"
            onSuccess={sendTokenServer}
            onFailure={handleGoogleFail}
            isSignedIn="false"
          />
        </li>
      </ul>
      <div className="addtnal_acnt">
        I do not have any account yet.
        <Link to="/signup">Create My Account Now !</Link>
      </div>
    </div>
  );
}

export default connect(null, null)(LoginForm);
