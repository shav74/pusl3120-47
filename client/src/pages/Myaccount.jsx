import React from "react";
import "./CSS/Myaccount.css";
import { ShopContext } from "../../Context/ShopContext";

const Myaccount = () => {
  const { changepass } = useContext(ShopContext);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  return (
    <div className="myaccount">
      <span>emai: ${email}</span>
      <div>
        <input
          type="text"
          name="oldpassword"
          onChange={(event) => setoldpassword(event.target.value)}
          placeholder="old password"
        />
        <input
          type="text"
          name="newpassword"
          onChange={(event) => setnewpassword(event.target.value)}
          placeholder="new password"
        />
        <button onClick={changepass(oldpassword, newpassword)}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Myaccount;
