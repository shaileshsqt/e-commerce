import * as types from "../actionTypes";
import axios from "axios";
import { config } from "../Headers";

//Register User
export const SignupAction = (data) => async (dispatch) => {
  console.log("Data", data);
  let body = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  };
  axios
    .post(`http://localhost:4001/auth/register`, body, config)
    .then((result) => {
      if (result.status === 200) {
        dispatch({ type: types.SIGNUP_SUCCESS, payload: data });
      } else {
        dispatch({
          type: types.SIGNUP_ERROR,
          payload: result.data.status,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: types.SIGNUP_ERROR, payload: error.response });
    });
};

export const LoginAction = (data) => async (dispatch) => {
  try {
    const result = await axios.post(
      `http://localhost:4001/auth/login`,
      data,
      config
    );
    console.log("Responce login action ", result);
    if (result.status == 200) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", result.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: data });
    } else {
      dispatch({
        type: types.LOGIN_ERROR,
        payload: result.data.message,
      });
    }
  } catch (err) {
    console.log("eorror login ACTION", err);
    dispatch({
      type: types.LOGIN_ERROR,
      payload: err.message,
    });
  }
};

// export const SignUpFunc = (payload) => (dispatch) => {
//   dispatch({ type: SIGNUP_REQUEST });
//   axios
//     .post(
//       "https://lifestyle-mock-server-api.onrender.com/registeredUser",
//       payload
//     )
//     .then((response) => {
//       dispatch({ type: SIGNUP_SUCCESS });
//     })
//     .catch((e) => {
//       dispatch({ type: SIGNUP_FAILURE });
//     });
// };

// export const getdata = (dispatch) => {
//   axios
//     .get("https://lifestyle-mock-server-api.onrender.com/registeredUser")
//     .then((res) => {
//       dispatch({ type: SIGNIN_REQUEST, payload: res.data });
//     })
//     .catch(() => {
//       dispatch({ type: SIGNIN_FAILURE });
//     });
// };

// export const loginFunction = (payload) => (dispatch) => {
//   dispatch({ type: SIGNIN_SUCCESS, payload: payload });
//   console.log(payload);
// };

// export const logout = (dispatch) => {
//   dispatch({ type: SIGNOUT });
// };
