import React from "react";

export default function PasswordForm() {
  return (
    <div className="register_sec">
      <h1>Forgot Password</h1>
      <ul>
        <li>
          <span>Enter E-mail ID</span>
          <input type="text" placeholder="User@gmail.com" />
        </li>
        <li>
          <input type="submit" value="Submit" />
        </li>
      </ul>
    </div>
  );
}
