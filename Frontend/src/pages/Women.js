import React, { useEffect, useState } from "react";

import { Button, Card, Image } from "react-bootstrap";
import Footer from "../component/Main/Footer";
import "../assets/styles/Home.css";
import "../component/Cart/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../toolkit/cartSlice";
import { Link, NavLink, useParams } from "react-router-dom";
import Header from "../component/Main/Header";
import { ApiCall } from "../common/ApiCall";

const Women = () => {
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
      url: `http://localhost:4001/Women/`,
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
    dispatch(addItem({ ...item, qty: 1 }));
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <div className="container mt-3">
        <div>
          <h3 className="Category-title">Women's Store</h3>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          {data?.map((element, id) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className=" mx-2 mt-4 card_style my-5 product-card"
                >
                  <Link
                    to={{
                      pathname: "/ProductDetail/" + "Women/" + element._id,
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={element.image}
                      // style={{ height: "18rem" }}
                      className="mt-3 pe-auto rounded"
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>
                      Price : ₹ {element.price}{" "}
                      <span style={{ textDecoration: "line-through" }}>
                        {element.actualPrice}
                      </span>
                    </Card.Text>

                    {/* <div className="add-to-cart-btn"> */}
                    <div className=" button_div d-flex justify-content-center ">
                      {getCardData?.findIndex((d) => d._id === element._id) >=
                      0 ? (
                        <Button
                          // variant="primary"
                          onClick={(e) => {
                            sendProduct(element._id);
                          }}
                          className="col-lg-12"
                        >
                          Remove to cart
                        </Button>
                      ) : (
                        <Button
                          // variant="primary"
                          onClick={(e) => {
                            Addtocart(element);
                          }}
                          className="col-lg-12"
                        >
                          Add to cart
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Women;
