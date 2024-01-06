import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = (props) => {
  const { product } = props;

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Product Description</div>
      </div>
      <div className="descriptionbox-description">{product.description}</div>
    </div>
  );
};

export default DescriptionBox;
