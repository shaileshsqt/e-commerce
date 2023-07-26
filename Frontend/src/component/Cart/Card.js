import React, { useEffect, useState } from "react";

import { Carousel, Button, Card, Image } from "react-bootstrap";
import Footer from "../Main/Footer";
import "../../assets/styles/Home.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../toolkit/cartSlice";
// import { ADD, GETPRODUCT, RemoveAll } from "../../redux/Action/cartAction";
import { Link, NavLink, useParams } from "react-router-dom";
import Header from "../Main/Header";
import { ApiCall } from "../../common/ApiCall";
import {
  slide1,
  slide2,
  slide3,
  slide4,
  Banner1,
  Mansban,
  WomensBaner
} from "../../assets/image";

const Cards = () => {
  const [data, setData] = useState([]);
  const isLoggedIn = localStorage.getItem("isLogin");
  // const getCardData = useSelector((state) => state.cart.carts);
  const getCardData = useSelector((store) => store.cart.cartsItem);
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  let param = useParams();
  let saved = 0;
  // console.log(data);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  console.log("Get Data", getCardData);
  const fetchData = async () => {
    let response = await ApiCall({
      method: "GET",
      url: `http://localhost:4001/Men/`,
    });
    setData(response);
    if (getCardData.length > 0 && getCardData.find((s) => s._id === data._id)) {
      setCartBtn("View to Cart");
    }
  };

  const sendProduct = (e) => {
    // console.log(e);
    dispatch(removeItem(e));
  };
  const Addtocart = (item) => {
    // item.qty = 1;
    // console.log("Temp", item);
    // dispatch(ADD(item));
    // dispatch(addItem(item));
    dispatch(addItem({ ...item, qty: 1 }));
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className="Herohead">
        <p className="text-center heroSecHeading">
          New arrivals in mens and womens wear upto 30% off ❤️
        </p>
      </div>
      <div></div>

      <div className="container mt-3">
        <Carousel>
          <Carousel.Item interval={5000}>
            <Image src={slide1} alt="First slide"></Image>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <Image src={slide2} alt="Second slide"></Image>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <Image src={slide3} alt="Third slide"></Image>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <Image src={slide4} alt="Four slide"></Image>
          </Carousel.Item>
        </Carousel>

        <div>
          <Image src={Banner1} alt="Banner1" className="Banner1"></Image>
        </div>
        <div>
          <div>
            <h3 className="Category-title">Mens's Store</h3>
          </div>
          <div>
            <Image src={Mansban} alt="Mansbaneer" className="Banner1"></Image>
          </div>
        </div>
        {/* Men's Category */}
        <div className="row">
          <div className="col-4">
            <Link to={{ pathname: "/Man" }}>
              <img src="https://i.ibb.co/47Sk9QL/product-1.jpg" alt="" />
              <h4>Printed Shirt</h4>
            </Link>
          </div>
          <div className="col-4">
            <img src="https://i.ibb.co/b7ZVzYr/product-2.jpg" alt="" />
            <h4>Shoes</h4>
          </div>
          <div className="col-4 ">
            <img src="https://i.ibb.co/QfCgdXZ/product-8.jpg" alt="" />
            <h4>Watches</h4>
          </div>
        </div>

        <div>
          <div>
            <h3 className="Category-title">Women's Store</h3>
          </div>
          <div>
            <Image
              src={WomensBaner}
              alt="WomensBaner"
              className="Banner1"
            ></Image>
          </div>
        </div>
        {/* Men's Category */}
        <div className="row">
          <div className="col-4">
            <Link to={{ pathname: "/Man" }}>
              <img src="https://i.ibb.co/47Sk9QL/product-1.jpg" alt="" />
              <h4>Printed Shirt</h4>
            </Link>
          </div>
          <div className="col-4">
            <img src="https://i.ibb.co/b7ZVzYr/product-2.jpg" alt="" />
            <h4>Shoes</h4>
          </div>
          <div className="col-4 ">
            <img src="https://i.ibb.co/QfCgdXZ/product-8.jpg" alt="" />
            <h4>Watches</h4>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cards;
