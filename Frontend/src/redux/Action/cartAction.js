import * as types from "../actionTypes";

export const ADD = (item) => {
  return {
    type: types.ADD_CART,
    payload: item,
  };
};

// remove iteams
export const DLT = (id) => {
  return {
    type: types.REMOVE_CART,
    payload: id,
  };
};

// remove individual iteam

export const REMOVE = (iteam) => {
  return {
    type: types.REMOVE_ONE,
    payload: iteam,
  };
};
