import React, { useEffect, useState } from "react";
import { Table, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import { INCREMENT, DECREMENT } from "../../redux/actionTypes";
// import { RemoveAll, ADD, REMOVE } from "../../redux/Action/cartAction";
import { CgTrash } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import Header from "../Main/Header";
// import { INCREMENT_ITEM, DECREMENT_ITEM } from "../../redux/Action/cartAction";
import {
  incrementQty,
  decrementQty,
  clearCart,
  removeItem,
} from "../../toolkit/cartSlice";
import Footer from "../Main/Footer";

const Checkout = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLogin");
  let saved = 0;
  const { cartsItem } = useSelector((store) => store.cart);
  // const getdata = useSelector((state) => state.cartreducer.carts);
  const getdata = useSelector((store) => {
    return store.cart.cartsItem;
  });

  const Increment_btn = (ele) => {
    dispatch(incrementQty(ele));
  };

  const Decrement_btn = (ele) => {
    dispatch(decrementQty(ele));
  };

  const ClearCart = (id) => {
    dispatch(removeItem(id));
    // navigate("/Dashboard");
  };
  // const getTotalPrice = () => {
  //   return getdata.reduce((total, e) => total + e.price * e.qty, 0);
  // };
  const getTotalPrice = () => {
    return cartsItem.reduce((total, e) => total + e.price * e.qty, 0);
  };
  console.log("data::::::", getTotalPrice);

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Container>
        <div className="">
          <h2 className="text-center">Iteams Details Page</h2>
          <div className="">
            {getdata.length > 0 ? (
              <Table bordered size="sm">
                <thead>
                  <tr className="Thead">
                    <th>ITEM DESCRIPTION</th>
                    <th> UNIT PRICE </th>
                    <th>QUANTITY </th>
                    <th>SubTotal </th>
                    <th> SAVING</th>
                    <th>Remove </th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {getdata?.map((ele) => {
                    {
                      saved =
                        saved +
                        (Math.floor(ele.price) -
                          Math.floor(ele.price - (10 * ele.price) / 100)) *
                          ele.qty;
                    }
                    return (
                      <tr>
                        <td style={{ fontSize: 12 }}>
                          {" "}
                          <Image
                            width={"100px"}
                            height={"100px"}
                            src={ele.image}
                            alt="Product Image"
                          />
                          <span>{ele?.title}</span>
                        </td>

                        <td>
                          <p>Original Price</p>
                          <div className="text-decoration-line-through">
                            Rs {Math.floor(ele.price)}
                          </div>
                          <p> Discount Price</p>
                          <span>
                            Rs {Math.floor(ele.price - (10 * ele.price) / 100)}
                          </span>
                        </td>
                        <td>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <button
                              style={{ fontSize: 24 }}
                              // onClick={() => dlt(ele.id)}
                              onClick={
                                ele.qty <= 1
                                  ? () => ClearCart(ele._id)
                                  : (e) => Decrement_btn(ele._id)
                              }
                            >
                              -
                            </button>
                            {/* <span
                              style={{ fontSize: 24 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </span> */}
                            <span style={{ fontSize: 22 }}>{ele?.qty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={(e) => Increment_btn(ele._id)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          {" "}
                          Rs{" "}
                          {Math.floor(ele.price - (10 * ele.price) / 100) *
                            ele.qty}
                        </td>
                        <td>
                          Rs{" "}
                          {Math.floor(
                            ele.price -
                              Math.floor(ele.price - (10 * ele.price) / 100)
                          ) * ele.qty}
                        </td>
                        <td>
                          <span
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          >
                            <CgTrash
                              // className="fas fa-trash"
                              onClick={() => ClearCart(ele._id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div
                className="card_details d-flex justify-content-center align-items-center"
                style={{ width: "24rem", padding: 10, position: "relative" }}
              >
                <AiOutlineClose
                  className="fas fa-close smallclose"
                  onClick={() => navigate("/Dashboard")}
                  style={{
                    position: "absolute",
                    top: 2,
                    marginRight: -290,
                    fontSize: 23,
                    cursor: "pointer",
                  }}
                />
                <p style={{ fontSize: 22 }}>Your carts is empty</p>
                <img
                  src="./cart.gif"
                  alt=""
                  className="emptycart_img"
                  style={{ width: "5rem", padding: 10 }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="checkout-div">
          <Row className="CHECK-HEAD">
            <Col sm>
              SubTotal <div>Delivery Charge</div>
            </Col>
            <Col sm>
              Rs {getTotalPrice() - saved} <div>***</div>
            </Col>
          </Row>
          <div className="CHECK-BODY ">
            <Col sm>
              {" "}
              <h6>TOTAL</h6>
            </Col>
            <Col sm>
              {" "}
              <h6> RS {getTotalPrice() - saved}</h6>
            </Col>
          </div>

          <div>
            <button>Checkout</button>
          </div>
        </div>

        {/* <Row>
          <Col md="6">
            <Card>
              <Row>
                <Col md="4">SubTotal</Col>
              </Row>
              <Row>
                <Col md="4">Delivery Charges</Col>
                <Col md="4">
                  <Card>Rs 3427</Card>
                </Col>
                <Col md="4">
                  <Card>Rs 3427</Card>
                </Col>
              </Row>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Card>1</Card>
                  </Col>
                  <Col md="6">
                    <Card>5</Card>
                  </Col>
                </Row>
                <Card.Text className="text-end">
                  <Button variant="primary">Go somewhere</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
      <Footer/>
    </>
  );
};

export default Checkout;
