import React from "react";
import {  useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import "./style.css";
import { message } from "antd";

const ProductItem = ({ item }) => {

  const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(addToCart({product:item,quantity:1}));
    message.success("item is added to Cart")
  }

  return (
    <div className="product-wrapper" onClick={handleClick}>
      <div className="product-item">
        <div className="product-img">
          <img className="h-36 object-cover w-full border-b" src={item.img} alt={item.title} />
        </div>
        <div className="product-info flex flex-col p-3">
          <span className="font-bold">{item.title}</span>
          <span>{item.price}₺</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
