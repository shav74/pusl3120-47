import React from "react";
import "./CSS/Myaccount.css";
import { ShopContext } from "../Context/ShopContext";
import { useState } from "react";
import { useContext } from "react";
import person_cut_icon from "../components/Assets/person-cut-icon.png";
import { Link } from "react-router-dom";

const Myaccount = () => {
  const { changepass } = useContext(ShopContext);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [email, setemail] = useState("");

  return (
    <div className="myaccount">
      <div className="myaccount-container">
        <h1>My Account
          {localStorage.getItem('auth-token') ?
            <img className="logout" src={person_cut_icon}
              onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>
            </img>
            : <></>}
        </h1>

        <div className="myaccount-info">
          <h3>Update your password here,</h3>

          <form>
            <p>Enter your email</p>
            <input
              type="text"
              name="email"
              onChange={(event) => setemail(event.target.value)}
              placeholder="Email Address"
            />

            <p>Enter old password (current)</p>
            <input
              type="text"
              name="oldpassword"
              onChange={(event) => setoldpassword(event.target.value)}
              placeholder="Old Password"
            />

            <p>Enter new password</p>
            <input
              type="text"
              name="newpassword"
              onChange={(event) => setnewpassword(event.target.value)}
              placeholder="New Password"
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
