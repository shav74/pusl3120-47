import React from "react";
import "./CSS/Myaccount.css";
import { ShopContext } from "../Context/ShopContext";
import { useState } from "react";
import { useContext } from "react";

const Myaccount = () => {
  const { changepass } = useContext(ShopContext);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [email, setemail] = useState("");

  return (
    <div className="myaccount">
      <div className="myaccount-container">
        <h1>My Account</h1>
        {/* <h2>Your Email: {email}</h2> */}
        <hr />
        <div className="myaccount-info">
          <h3>Update your password here,</h3>

          <p>Enter old password (current)</p>
          <form>
            <input
              type="text"
              name="email"
              onChange={(event) => setemail(event.target.value)}
              placeholder="email"
            />

            <input
              type="text"
              name="oldpassword"
              onChange={(event) => setoldpassword(event.target.value)}
              placeholder="Old password"
            />

            <p>Enter new password</p>
            <input
              type="text"
              name="newpassword"
              onChange={(event) => setnewpassword(event.target.value)}
              placeholder="New password"
            />

            <div className="submit-btn">
              <button
                onClick={() => {
                  changepass(oldpassword, newpassword, email);
                }}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
