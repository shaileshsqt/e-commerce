import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

import { ADD, GETPRODUCT, RemoveAll } from "../../redux/Action/cartAction";
import { Link, NavLink, useParams } from "react-router-dom";
import Header from "../Main/Header";
import { ApiCall } from "../../common/ApiCall";

const Cards = () => {
  const [data, setData] = useState([]);
  const getCardData = useSelector((state) => state?.cartreducer?.carts);
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  let param = useParams();
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
    if (getCardData.lenght > 0 && getCardData.find((s) => s._id === data._id)) {
      setCartBtn("View to Cart");
    }
  };

  const sendProduct = (e) => {
    // console.log(e);
    dispatch(RemoveAll(e));
  };
  const Addtocart = (item) => {
    item.qty = 1;
    console.log("Temp", item);
    dispatch(ADD(item));
  };

  return (
    <>
      <Header />
      <div className="container mt-3">
        <h2 className="text-center">Add to Cart Projects</h2>

        <div className="row d-flex justify-content-center align-items-center">
          {data?.map((element, id) => {
            console.log("element::", element);
            // const ItemIndex =
            //   getCardData.lenght > 0 &&
            //   getCardData.findIndex((item) => item._id === element._id);
            // console.log("ITEMINDEX", ItemIndex);
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="mx-2 mt-4 card_style"
                >
                  <Link
                    // onClick={(e) => {
                    //   sendProduct(element);
                    // }}
                    to={{ pathname: "/ProductDetail/" + element._id }}
                  >
                    <Card.Img
                      variant="top"
                      src={element.image}
                      style={{ height: "18rem" }}
                      className="mt-3 pe-auto"
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>Price : ₹ {element.price}</Card.Text>
                    <div className="button_div d-flex justify-content-center">
                      {getCardData?.findIndex((d) => d._id === element._id) >=
                      0 ? (
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            sendProduct(element._id);
                          }}
                          className="col-lg-12"
                        >
                          Remove to cart
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
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
    </>
  );
};

export default Cards;
