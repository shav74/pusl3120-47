import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [allorders, setAllorders] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/getorders")
      .then((res) => res.json())
      .then((data) => {
        setAllorders(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <div className="orders">
        <div className="orders-format-main">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Adress</p>
          <p>Post Code</p>
          <p>Province</p>
          <p>Item Name</p>
          <p>Quantity</p>
        </div>

        <div className="orders-allproducts">
          <hr />
          {allorders.map((order) => {
            return (
              <>
                <div
                  key={order._id}
                  className="orders-format-main orders-format"
                >
                  <p>{order.firstname}</p>
                  <p>{order.lastname}</p>
                  <p>{order.address}</p>
                  <p>{order.postcode}</p>
                  <p>{order.province}</p>
                  <p>{order.itemname}</p>
                  <p>{order.quantity}</p>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
