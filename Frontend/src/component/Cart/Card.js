import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import "./style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../../redux/Action/cartAction";
import Header from "../Main/Header";
import { ApiCall } from "../../common/ApiCall";

const Cards = () => {
  const [data, setData] = useState([]);
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
    console.log("data", response);
    setData(response);
  };

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  return (
    <>
      <Header />
      <div className="container mt-3">
        <h2 className="text-center">Add to Cart Projects</h2>

        <div className="row d-flex justify-content-center align-items-center">
          {data.map((element, id) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="mx-2 mt-4 card_style"
                >
                  <Card.Img
                    variant="top"
                    src={element.image}
                    style={{ height: "18rem" }}
                    className="mt-3"
                  />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>Price : ₹ {element.price}</Card.Text>
                    <div className="button_div d-flex justify-content-center">
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          send(element);
                        }}
                        className="col-lg-12"
                      >
                        Add to Cart
                      </Button>
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
