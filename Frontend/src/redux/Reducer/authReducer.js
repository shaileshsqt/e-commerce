import * as types from "../actionTypes";

const initialState = {
  errMsg: null,
  isLogin: false,
  userData: {},
  Login_User: {},
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case types.LOGIN_SUCCESS:
      return {
        isLogin: true,
        ...state,
        Login_User: action.payload,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
        errMsg: action.payload,
      };
    case types.LOGOUT_SUCCESS:
      // window.location = "/";
      return {
        isLogin: false,
      };

    default:
      return state;
  }
};
export default AuthReducer;
