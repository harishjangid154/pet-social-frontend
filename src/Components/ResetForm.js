import React from "react";

export default function ResetForm() {
  return (
    <div className="register_sec">
      <h1>Reset Password</h1>
      <ul>
        <li>
          <span>Enter New Password</span>
          <input type="text" placeholder="Enter your new password" />
        </li>
        <li>
          <span>Confirm Password</span>
          <input type="text" placeholder="Enter your password again" />
        </li>
        <li>
          <input type="submit" value="Submit" />
        </li>
      </ul>
    </div>
  );
}
