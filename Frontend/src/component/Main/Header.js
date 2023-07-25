import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { BsFillCartFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUserRectangle } from "react-icons/bi";

import { RemoveAll } from "../../redux/Action/cartAction";
import { Link } from "react-router-dom";
import { LOGOUT_SUCCESS } from "../../redux/actionTypes";
import { ToastMessage } from "../../common/ToastMessage";
import { rgbToHex } from "@mui/material";

const Header = ({ isLoggedIn }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  // const getdata = useSelector((state) => state.cartreducer.carts);
  const getdata = useSelector((store) => store.cart.cartsItem);

  console.log("getData", getdata);
  const dispatch = useDispatch();
  const UserName = localStorage.getItem("username");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logoutHandal = () => {
    localStorage.clear();
    dispatch({ type: LOGOUT_SUCCESS, payload: "item" });
    navigate("/");
  };

  const dlt = (id) => {
    dispatch(RemoveAll(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total, isLoggedIn]);

  return (
    <>
      <Navbar
        className="navbar bg-body-tertiary"
        bg="light"
        sticky="top"
        // data-bs-theme="dark"
        variant="dark"
        // style={{ height: "60px", backgroundColor: "gray" }}
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/Dashboard" style={{ color: "black" }}>
            ApNa BaZaR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {isLoggedIn === false && (
              <>
                <Nav.Link as={Link} to="/" id="page">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Signup" id="page">
                  Register
                </Nav.Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link
                    as={Link}
                    to="/Dashboard"
                    id="page"
                    // className="text-decoration-none text-light"
                  >
                    Man
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/Dashboard"
                    id="page"
                    // className="text-decoration-none text-light"
                  >
                    Women
                  </Nav.Link>
                </Nav>
              </>
            )}

            {/* <Form className="d-flex mx-5">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
          <NavDropdown
            title={"Welcome" + " " + UserName}
            // className="text-decoration-none text-light"
          >
            <NavDropdown.Item onClick={() => logoutHandal()}>
              Logout
            </NavDropdown.Item>
            <NavDropdown.Item>Edit Profile</NavDropdown.Item>
          </NavDropdown>

          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <span
              style={{
                fontSize: 20,
                cursor: "pointer",
                color: "white",
              }}
            >
              <NavLink to={{ pathname: `/cart` }}>
                <BsFillCartFill />
              </NavLink>
            </span>
          </Badge>
        </Container>

        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            {" "}
                            <NavLink
                              to={{ pathname: `/cart/${e._id}` }}
                              onClick={handleClose}
                            >
                              <img
                                src={e.image}
                                style={{ width: "5rem", height: "5rem" }}
                                alt=""
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.title}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>Quantity : {e.qty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e._id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>

                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e._id)}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total : ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 22 }}>Your carts is empty</p>
              <img
                src="./cart.gif"
                alt=""
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu> */}
      </Navbar>
    </>
  );
};

export default Header;
