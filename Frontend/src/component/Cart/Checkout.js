import React, { useEffect, useState } from "react";
import { Table, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

const Checkout = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLogin");
  // const { cartItems } = useSelector((store) => store.cartReducer);
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

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className="">
        <h2 className="text-center">Iteams Details Page</h2>
        <div className="">
          {getdata.length > 0 ? (
            <Table bordered size="sm">
              <thead>
                <tr className="Thead">
                  <th>ITEM DESCRIPTION</th>
                  <th>QUANTITY </th>
                  <th>Price </th>
                  <th>Total </th>
                  <th>Rating </th>
                  <th>Remove </th>
                </tr>
              </thead>
              {getdata?.map((ele) => {
                return (
                  <>
                    <tbody className="tbody">
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
                          <div> ₹ {ele?.price} </div>
                        </td>
                        <td>₹ {ele?.price * ele?.qty}</td>
                        <td>
                          <span
                            style={{
                              background: "green",
                              color: "#fff",
                              padding: "2px 5px",
                              borderRadius: "5px",
                            }}
                          >
                            {ele.rating}3 ★
                          </span>
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
                    </tbody>
                  </>
                );
              })}
            </Table>
          ) : (
            // getdata?.map((ele) => {
            //   console.log("LLLP DATA:::", ele);
            //   return (
            //     <>
            //       {/* <div className="items_img">
            //         <img src={ele.image} alt="" />
            //       </div> */}
            //       <div>
            //         {/* <Table>
            //           <tr>
            //             <h2>{ele?.title}</h2>
            //           </tr>
            //           <tr>
            //             <td>
            //               <p>
            //                 <strong>Category</strong> : {ele?.category}
            //               </p>
            //               <p>
            //                 <strong>Price</strong> : ₹ {ele?.price}
            //               </p>

            //               <p>
            //                 <strong>Total</strong> :₹ {ele?.price * ele?.qty}
            //               </p>
            //               <div
            //                 className="mt-5 d-flex justify-content-between align-items-center"
            //                 style={{
            //                   width: 100,
            //                   cursor: "pointer",
            //                   background: "#ddd",
            //                   color: "#111",
            //                 }}
            //               >
            //                 <button
            //                   style={{ fontSize: 24 }}
            //                   // onClick={() => dlt(ele.id)}
            //                   onClick={
            //                     ele.qty <= 1
            //                       ? () => ClearCart(ele._id)
            //                       : (e) => Decrement_btn(ele._id)
            //                   }
            //                 >
            //                   -
            //                 </button>
            //                 {/* <span
            //                 style={{ fontSize: 24 }}
            //                 onClick={
            //                   ele.qnty <= 1
            //                     ? () => dlt(ele.id)
            //                     : () => remove(ele)
            //                 }
            //               >
            //                 -
            //               </span> */}
            //         {/* <span style={{ fontSize: 22 }}>{ele?.qty}</span>
            //                 <span
            //                   style={{ fontSize: 24 }}
            //                   onClick={(e) => Increment_btn(ele._id)}
            //                 >
            //                   +
            //                 </span>
            //               </div>
            //             </td>
            //             <td>
            //               <p>
            //                 <strong>Rating :</strong>{" "}
            //                 <span
            //                   style={{
            //                     background: "green",
            //                     color: "#fff",
            //                     padding: "2px 5px",
            //                     borderRadius: "5px",
            //                   }}
            //                 >
            //                   {ele.rating} ★{" "}
            //                 </span>
            //               </p>

            //               <p>
            //                 <strong>Remove :</strong>
            //                 <span
            //                   style={{
            //                     color: "red",
            //                     fontSize: 30,
            //                     cursor: "pointer",
            //                   }}
            //                 >
            //                   <CgTrash
            //                     // className="fas fa-trash"
            //                     onClick={() => ClearCart(ele._id)}
            //                   />
            //                 </span>
            //               </p>
            //             </td> */}
            //         {/* // </tr>
            //         // </Table>  */}

            //         <Table striped bordered hover size="sm">

            //         </Table>
            //       </div>
            //     </>
            //   );
            // })
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
    </>
  );
};

export default Checkout;
