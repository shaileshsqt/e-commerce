import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../common/ApiCall";
// import { DLT, ADD, REMOVE } from "../redux/actions/action";
import { RemoveAll, ADD, REMOVE } from "../../redux/Action/cartAction";
import Header from "../Main/Header";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let param = useParams();

  console.log("param ::", param);
  const getdata = useSelector((state) => state?.cartreducer?.getProduct);
  const getCardData = useSelector((state) => state?.cartreducer?.carts);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    let response = await ApiCall({
      method: "GET",
      url: `http://localhost:4001/Men/product?id=${param.id}`,
    });
    console.log("fetch param data", response);
    // if (response.length > 0) {
    setData(response);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const compare = () => {
  //   debugger;
  //   let comparedata = getdata.filter((e) => {
  //     return e.id == id;
  //   });
  //   setData(comparedata);
  // };

  // add data

  const AddCart = (e) => {
    console.log("e", e);
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(RemoveAll(id));
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  // useEffect(() => {
  //   getdata();
  // }, [useSelector]);
  console.log("Data log", data);
  return (
    <>
      <Header />
      <div className="container mt-2">
        <h2 className="text-center">Product Details Page</h2>

        <section className="container mt-3">
          <div className="iteamsdetails">
            {/* {data?.map((ele) => { */}
            {/* return ( */}
            <>
              <div className="items_img">
                <img src={data?.image} alt="" />
              </div>

              <div className="details">
                <Table>
                  <tr>
                    {" "}
                    <h2>{data?.title}</h2>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {" "}
                        <strong>Category</strong> : {data?.category}
                      </p>
                      <p>
                        {" "}
                        <strong>Price</strong> : ₹{data?.price}
                      </p>

                      <p>
                        {" "}
                        {/* <strong>Total</strong> :₹ {ele.price * ele.qnty} */}
                      </p>
                      <div
                        className="mt-5 d-flex justify-content-between  button_div align-items-center"
                        style={{
                          width: 100,
                          cursor: "pointer",
                          background: "#ddd",
                          color: "#111",
                        }}
                      >
                        {getCardData?.findIndex((d) => d._id === data?._id) >=
                        0 ? (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              dlt(data?._id);
                            }}
                            className="col-lg-12"
                          >
                            Remove to cart
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              AddCart(data);
                            }}
                            className="col-lg-12"
                          >
                            Add to cart
                          </Button>
                        )}
                        {/* <button
                              style={{ fontSize: 24 }}
                              // onClick={() => dlt(ele.id)}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </button> */}
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
                        {/* <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(ele)}
                            >
                              +
                            </span> */}
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
                          {data?.rating} ★{" "}
                        </span>
                      </p>

                      <p>
                        <strong>Remove :</strong>{" "}
                        <span>
                          <i
                            className="fas fa-trash"
                            onClick={() => dlt(data?.id)}
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          ></i>{" "}
                        </span>
                      </p>
                    </td>
                  </tr>
                </Table>
              </div>
            </>
            {/* );
            })} */}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
