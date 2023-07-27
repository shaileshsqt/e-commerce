import React, { useEffect, useState } from "react";
import moment from "moment";
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
// {
//   moment(post.date).format();
// }
import {
  slide1,
  slide2,
  slide3,
  slide4,
  Banner1,
  Mansban,
  WomensBaner,
  manMainBaner,
  womenCat2,
  womenCat3,
  womenCat4,
  manBaner1,
  manBaner2,
  manBaner3,
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
  let array1 = [
    "2023-06-30",
    "2023-07-01",
    "2023-07-02",
    "2023-07-03",
    "2023-07-04",
    "2023-07-05",
    "2023-07-06",
    "2023-07-07",
    "2023-07-08",
    "2023-07-09",
    "2023-07-10",
    "2023-07-11",
    "2023-07-12",
    "2023-07-13",
    "2023-07-14",
    "2023-07-15",
    "2023-07-16",
    "2023-07-17",
    "2023-07-18",
    "2023-07-19",
    "2023-07-20",
    "2023-07-21",
    "2023-07-22",
    "2023-07-23",
    "2023-07-24",
    "2023-07-25",
    "2023-07-26",
    "2023-07-27",
    "2023-07-28",
    "2023-07-29",
    "2023-07-30",
  ];

  let array2 = [
    {
      id: 99,
      description: "Vegitable",
      date: "2023-07-18T13:59:11.069Z",
      money: "780",
      type: "income",
    },
    {
      id: 1,
      description: "Vegitable",
      date: "2023-07-18T13:59:11.069Z",
      money: "780",
      type: "expense",
    },
    {
      id: 2,
      description: "Fruites",
      date: "2023-07-20T13:59:11.000Z",
      money: "500",
      type: "expense",
    },
    {
      id: 3,
      description: "biscuits",
      date: "2023-07-18T14:04:27.764Z",
      money: "30",
      type: "expense",
    },
    {
      id: 4,
      description: "Bike Sale",
      date: "2023-07-05T14:04:37.000Z",
      money: "40",
      type: "income",
    },
    {
      id: 5,
      description: "Labour",
      date: "2023-08-05T14:04:50.000Z",
      money: "100000",
      type: "income",
    },
    {
      id: 6,
      description: "Chocolates",
      date: "2023-07-19T04:31:55.969Z",
      money: "80",
      type: "expense",
    },
    {
      id: 7,
      description: "Shailesh exp",
      date: "2023-08-18T04:42:31.000Z",
      money: "80",
      type: "expense",
    },
    {
      id: 8,
      description: "jay exp",
      date: "2023-08-10T04:43:00.000Z",
      money: "70",
      type: "expense",
    },
    {
      id: 9,
      description: "Car Wash",
      date: "2023-07-11T04:47:05.000Z",
      money: "200",
      type: "expense",
    },
  ];

  debugger;
  // array1.find((item) => {
  //   let find = array2.filter(
  //     (it) => moment(it.date).format("YYYY-MM-DD") === item
  //   );
  //       // let NewArray = [{ name: item, Income: 0, expense: 0 }];
  //   if (!find) {
  //     let NewArray = [{ name: item, Income: 0, expense: 0 }];
  //     console.log("New Array --> !find", NewArray);
  //   } else {
  //     let NewArray = [{ name: item, Income: find.Type, expense: find.type }];
  //     console.log("New Array---> match", NewArray);
  //   }
  // });

  var arr = [];
  for (var i = 0; i < array1.length; i++) {
    var obj = {}; // <---- Move declaration inside loop
    const element = array1[i];
    let find = array2.filter(
      (it) => moment(it.date).format("YYYY-MM-DD") === element
    );
    if (find.length === 0) {
      obj["DATE"] = element;
      obj["income"] = 0;
      obj["expense"] = 0;
      arr.push(obj);
    } else {
      const isFound = find.some((itm) => {
        let expense = 0,
          income = 0;
        if (itm.type === "expense") {
          expense = parseInt(itm.money);
        } else {
          income = parseInt(itm.money);
        }

        let findIndex = arr.findIndex(
          (i) => moment(i.date).format("YYYY-MM-DD") === element
        );
        if (findIndex >= 0) {
          arr[findIndex].income = arr[findIndex].income + income;
          arr[findIndex].expense = arr[findIndex].expense + expense;
        } else {
          arr = [...arr, { date: element, income, expense }];
        }
      });
    }
  }
  console.log("Final Array", arr);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className="Herohead">
        <p className="text-center heroSecHeading">
          New arrivals in mens and womens wear upto 30% off ❤️
        </p>
      </div>

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
            <Image
              src={manMainBaner}
              alt="Mansbaneer"
              className="Banner1"
            ></Image>
          </div>
        </div>
        {/* Men's Category */}
        <div className="row">
          <div className="col-4">
            <Link to={{ pathname: "/Man" }}>
              <img src={manBaner1} alt="Men's Category " />
              <h4>Up To 50% Off</h4>
            </Link>
          </div>
          <div className="col-4">
            <Link to={{ pathname: "/Man" }}>
              <img src={manBaner2} alt="Men's Category " />
              <h4>Up To 50% Off</h4>
            </Link>
          </div>
          <div className="col-4 ">
            <Link to={{ pathname: "/Man" }}>
              <img src={manBaner3} alt="Men's Category " />
              <h4>Up To 50% Off</h4>
            </Link>
          </div>
        </div>

        {/* Womens's Category  */}
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

        <div className="row">
          <div className="col-4">
            <Link to={{ pathname: "/Women" }}>
              <img src={womenCat2} alt="womenCat2" />
              <h4>Up To 60% Off</h4>
            </Link>
          </div>
          <div className="col-4">
            <Link to={{ pathname: "/Women" }}>
              <img src={womenCat3} alt="womenCat3" />
              <h4>Up To 60% Off</h4>
            </Link>
          </div>
          <div className="col-4 ">
            <Link to={{ pathname: "/Women" }}>
              <img src={womenCat4} alt="womenCat4" />
              <h4>Up To 60% Off</h4>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cards;
