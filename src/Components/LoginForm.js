import React from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="login_sec">
      <h1>Log In</h1>
      <ul>
        <li>
          <span>Email-ID</span>
          <input type="text" placeholder="Enter your email" />
        </li>
        <li>
          <span>Password</span>
          <input type="text" placeholder="Enter your password" />
        </li>
        <li>
          <input type="checkbox" />
          Remember Me
        </li>
        <li>
          <input type="submit" value="Log In" />
          <Link to="/forgot">Forgot Password</Link>
        </li>
      </ul>
      <div className="addtnal_acnt">
        I do not have any account yet.
        <Link to="/signup">Create My Account Now !</Link>
      </div>
    </div>
  );
}
