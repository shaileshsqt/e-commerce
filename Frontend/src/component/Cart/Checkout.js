import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { INCREMENT, DECREMENT } from "../../redux/actionTypes";
import { RemoveAll, ADD, REMOVE } from "../../redux/Action/cartAction";
import { CgTrash } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import Header from "../Main/Header";
import { INCREMENT_ITEM, DECREMENT_ITEM } from "../../redux/Action/cartAction";

const Checkout = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getdata = useSelector((state) => {
    return state.cartreducer.carts;
  });
  console.log("get data in cardDetail", getdata);

  // const compare = () => {
  //   let comparedata = getdata.filter((e) => {
  //     return e._id == id;
  //   });
  //   setData(comparedata);
  //   console.log("Compare DAta", comparedata);
  // };

  // add data

  const send = (item) => {
    // console.log(e);
    // item.qty = 1;

    console.log("increment btn", item);
    // dispatch({ type: INCREMENT, payload: item });
    // dispatch(INCREMENT_ITEM(item));
    // dispatch(ADD(e));
  };

  const ClearCart = (id) => {
    dispatch(RemoveAll(id));
    navigate("/");
  };

  // remove one
  const remove = (item) => {
    dispatch(DECREMENT_ITEM(item));
    // dispatch({ type: DECREMENT, payload: item });
  };

  // useEffect(() => {
  //   compare();
  // }, [id]);

  return (
    <>
      <Header />
      <div className="container mt-2">
        <h2 className="text-center">Iteams Details Page</h2>

        <section className="container mt-3">
          <div className="iteamsdetails">
            {getdata.length > 0 ? (
              getdata.map((ele) => {
                return (
                  <>
                    <div className="items_img">
                      <img src={ele.image} alt="" />
                    </div>

                    <div className="details">
                      <Table>
                        <tr>
                          <td>
                            <p>
                              <strong>Category</strong> : {ele.category}
                            </p>
                            <p>
                              <strong>Price</strong> : ₹{ele.price}
                            </p>

                            <p>
                              <strong>Total</strong> :₹ {ele.price * ele.qty}
                            </p>
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
                                    : () => dispatch(DECREMENT_ITEM(ele))
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
                                onClick={(e) => dispatch(INCREMENT_ITEM(ele))}
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td>
                            <p>
                              <strong>Rating :</strong>{" "}
                              <span
                                style={{
                                  background: "green",
                                  color: "#fff",
                                  padding: "2px 5px",
                                  borderRadius: "5px",
                                }}
                              >
                                {ele.rating} ★{" "}
                              </span>
                            </p>

                            <p>
                              <strong>Remove :</strong>
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 30,
                                  cursor: "pointer",
                                }}
                              >
                                <CgTrash
                                  // className="fas fa-trash"
                                  onClick={() => ClearCart(ele._id)}
                                />
                              </span>
                            </p>
                          </td>
                        </tr>
                      </Table>
                    </div>
                  </>
                );
              })
            ) : (
              <div
                className="card_details d-flex justify-content-center align-items-center"
                style={{ width: "24rem", padding: 10, position: "relative" }}
              >
                <AiOutlineClose
                  className="fas fa-close smallclose"
                  onClick={() => navigate("/")}
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
        </section>
      </div>
    </>
  );
};

export default Checkout;
