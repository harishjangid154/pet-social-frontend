import React from "react";

export default function Footer() {
  return (
    <>
      <div className="footr w-100">
        <div className="footr_lft">
          <div className="footer_div1">
            Copyright © Pet-Socail 2014 All Rights Reserved
          </div>
          <div className="footer_div2">
            <a href="#">Privacy Policy </a>| <a href="#"> Terms & Conditions</a>
          </div>
        </div>
        <div className="footr_rgt">
          <ul>
            <li>
              <a href="#">
                <img src="images/social_1.png" alt="image2" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/social_2.png" alt="image10" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/social_3.png" alt="image3" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/social_4.png" alt="image4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
