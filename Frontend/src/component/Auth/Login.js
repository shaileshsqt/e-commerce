import React, { useEffect, useState } from "react";
import "./Login.css";
import Header from "../Main/Header";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { AiFillTwitterSquare, AiFillGoogleSquare } from "react-icons/ai";
import { ApiCall } from "../../common/ApiCall";
import { ToastMessage } from "../../common/ToastMessage";
import { LoginAction } from "../../redux/Action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "@mui/material";
import * as types from "../../redux/actionTypes";

const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [errMsg, setErrMsg] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { errMsg } = useSelector((state) => state.AuthReducer);
  console.log("Error MSj", errMsg);
  //   const { errMsg, Login_User } = useSelector((state) => state.Auth);
  //   const { getRollRightData, getRoleData } = useSelector((state) => state.Auth);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       dispatch(GetData());
  //     };
  //     fetchUser();
  //     dispatch(GetRollTable());
  //     dispatch(GetRollRightUser());
  //   }, []);

  const Validation = () => {
    const { email, password } = user;
    let error = {};
    if (!email) {
      error.email = "Please Enter your Email.";
    }
    if (!password) {
      error.password = " The password field is Empty.";
    }

    return error;
  };

  const onChangeHandal = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
    if (!!error[field])
      setError({
        ...error,
        [field]: null,
      });
  };

  const HandleSubmit = async (e) => {
    let formValidate = Validation();
    if (Object.keys(formValidate).length > 0) {
      setError(formValidate);
    } else {
      let response = await ApiCall({
        method: "POST",
        url: `http://localhost:4001/auth/login`,
        body: { email: user.email, password: user.password },
      });
      console.log("data", response);
      if (response.status_code == 1) {
        ToastMessage(response.message);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", response.data.firstName);
        dispatch({ type: types.LOGIN_SUCCESS, payload: response });
        navigate("/");
      } else {
        setErrMsg(true);
      }
    }
  };

  return (
    <>
      <div>
        <Container>
          <Row
            className="pt-2 d-flex justify-content-center align-items-center "
            data-tour="step-4"
          >
            <Col lg="4">
              <Card className="my-3 mx-1 rounded-3 mb-5 bg-body shadow">
                <Card.Header as="h5">Login Form</Card.Header>
                <Card.Body className="px-3">
                  <Form>
                    <Form.Group className="mb-3 " controlId="Email">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaUser />
                        </span>

                        <Form.Control
                          type="email"
                          placeholder="Enter Your Email"
                          name="email"
                          value={user.email}
                          onChange={(e) =>
                            onChangeHandal("email", e.target.value)
                          }
                          isInvalid={!!error["email"]}
                        />
                      </div>
                      <Form.Control.Feedback type="isInvalid">
                        {error["email"]}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaLock />
                        </span>

                        <Form.Control
                          type="Password"
                          placeholder="Enter Your Password"
                          name="Password"
                          value={user.password}
                          onChange={(e) =>
                            onChangeHandal("password", e.target.value)
                          }
                          isInvalid={!!error["password"]}
                        />
                      </div>
                      <Form.Control.Feedback type="isInvalid">
                        {error["password"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="message">
                      <div>
                        <a href="#">Forgot your password</a>
                      </div>
                    </div>

                    <Button variant="primary" onClick={(e) => HandleSubmit(e)}>
                      Login
                    </Button>
                    <span>{errMsg == null ? "" : errMsg}</span>
                    <Button
                      variant="secondary"
                      className="mx-5 position-relative"
                      onClick={() => navigate("/Signup")}
                    >
                      Signup
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Login;
