import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { signup } from "../Functions/authFunctions";
import GoogleLogin from "react-google-login";
import { api_base_url } from "../BaseURL/baseUrl";
import axios from "axios";

function SignupForm() {
  const history = useHistory();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const checkBoxRef = useRef();
  const [errors, setErrors] = useState({});

  const sendTokenServer = (token) => {
    axios({
      method: "post",
      url: `${api_base_url}auth/google`,
      data: { code: token.code },
    }).then((res) => {
      console.log(res);
      history.push("/");
    });
  };

  const handleGoogleFail = () => {
    console.log("Fail");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    setErrors({});
    if (!checkBoxRef.current.checked) {
      err.checkBox = "Accept Term";
      setErrors({ ...err });
    } else {
      // USER DATA
      let user = {
        email: emailRef.current.value,
        userName: userNameRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        password: passwordRef.current.value,
      };

      const token = await signup(user, setErrors, err);
      if (token) {
        // console.log(token);
        // document.cookie = `jwt-token=${token.token}`;
        // user = jwt.decode(token);
        // store.dispatch({ type: "SET_USER", payload: user });
        history.push("/");
      }
    }
  };

  return (
    <div className="register_sec">
      <h1>Create An Account</h1>
      <ul>
        <li>
          <span>{errors.userName}</span>
          <span>Username</span>
          <input
            type="text"
            placeholder="Enter your username"
            ref={userNameRef}
            required
          />
        </li>
        <li>
          <span>{errors.password}</span>
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
            required
          />
        </li>
        <li>
          <span>{errors.email}</span>
          <span>Email</span>
          <input
            type="text"
            placeholder="Enter your email"
            ref={emailRef}
            required
          />
        </li>
        <li>
          <span>{errors.firstName}</span>
          <span>First Name</span>
          <input
            type="text"
            placeholder="Enter your first name"
            ref={firstNameRef}
            required
          />
        </li>
        <li>
          <span>{errors.lastName}</span>
          <span>Last Name</span>
          <input
            type="text"
            placeholder="Enter your last name"
            ref={lastNameRef}
            required
          />
        </li>
        <li>
          <span>{errors.checkBox}</span>
          <input type="checkbox" ref={checkBoxRef} />I agree to Term &
          Conditions
        </li>
        <li>
          <input type="submit" value="Register" onClick={handleSubmit} />
        </li>
        <li>
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
        I already have an account.<Link to="/login">Login My Account !</Link>
      </div>
    </div>
  );
}

export default connect(null, null)(SignupForm);
