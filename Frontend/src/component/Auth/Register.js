import React, { useState, useEffect } from "react";
import Header from "../Main/Header";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../../common/ApiCall";
import { ToastMessage } from "../../common/ToastMessage";
import { SignupAction } from "../../redux/Action/authAction";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { getRoleData } = useSelector((state) => state.Auth);

  //get Right User Info
  //   useEffect(() => {
  //     dispatch(GetRollTable());
  //   }, []);

  const Validation = () => {
    const { firstName, lastName, email, password, ConfirmPassword } = user;
    let error = {};

    if (!firstName) {
      error.firstName = "please Enter first Name ";
    }
    if (!lastName) {
      error.lastName = "please Enter last Name";
    }
    if (!email) {
      error.email = "Please Enter your Email.";
    }
    if (!password) {
      error.password = " The password field is Empty.";
    }
    if (password.length < 7) {
      error.password = " Password should be more than 8 characters";
    }
    if (!ConfirmPassword) {
      error.ConfirmPassword = "The ConfirmPassword field is Empty.";
    }
    if (ConfirmPassword !== password) {
      error.ConfirmPassword = "Please make sure your passwords match.";
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
     e.preventDefault();
    let formValidate = Validation();
    if (Object.keys(formValidate).length > 0) {
      setError(formValidate);
    } else {
       let response = await ApiCall({
         method: "POST",
         url: `http://localhost:4001/auth/register`,
         body: {
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           password: user.password,
         },
       });
      console.log("data", response);
      if (response.status_code == 1) {
        ToastMessage(response.message);
        navigate("/login");
      } else {
        
      }
    }
  };

  //   const HandleOnChange = (RollName, key, value) => {
  //     let check = getRoleData.map((item, index) => {
  //       if (item.RollName === RollName) {
  //         item[key] = value;
  //       }
  //       return item;
  //     });
  //     setRole(check);
  //   };

  return (
    <div>
      <Header />
      <Container>
        <Row
          className="pt-2 d-flex justify-content-center align-items-center "
          data-tour="step-4"
        >
          <Col lg="8">
            <Card className="my-2 mx-2 rounded-3 mb-5 bg-body shadow">
              <Card.Header as="h5">Welcome to ApNa BaZaR ✌️</Card.Header>
              <Card.Body className="px-3">
                <Form>
                  <Row>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) =>
                          onChangeHandal("firstName", e.target.value)
                        }
                        isInvalid={!!error["firstName"]}
                      />
                      <Form.Control.Feedback type="isInvalid">
                        {error["firstName"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={user.lastName}
                        onChange={(e) =>
                          onChangeHandal("lastName", e.target.value)
                        }
                        isInvalid={!!error["lastName"]}
                      />
                      <Form.Control.Feedback type="isInvalid">
                        {error["lastName"]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3 " controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={user.email}
                      onChange={(e) => onChangeHandal("email", e.target.value)}
                      isInvalid={!!error["email"]}
                    />
                    <Form.Control.Feedback type="isInvalid">
                      {error["email"]}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      name="password"
                      value={user.password}
                      onChange={(e) =>
                        onChangeHandal("password", e.target.value)
                      }
                      isInvalid={!!error["password"]}
                    />
                    <Form.Control.Feedback type="isInvalid">
                      {error["password"]}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ConfirmPassword">
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="ConfirmPassword"
                      name="ConfirmPassword"
                      value={user.ConfirmPassword}
                      onChange={(e) =>
                        onChangeHandal("ConfirmPassword", e.target.value)
                      }
                      isInvalid={!!error["ConfirmPassword"]}
                    />
                    <Form.Control.Feedback type="isInvalid">
                      {error["ConfirmPassword"]}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" onClick={(e) => HandleSubmit(e)}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Register;
