import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartsItem: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.cartsItem.push(action.payload);
    },
    clearCart: (state, action) => {
      state.cartsItem = [];
    },
    removeItem: (state, action) => {
      state.cartsItem = state.cartsItem.filter((element) => {
        return action.payload !== element._id;
      });
    },
    incrementQty: (state, action) => {
      state.cartsItem.map((item) => {
        if (item._id === action.payload) {
          item.qty += 1;
        }
      });
    },
    decrementQty: (state, action) => {
      state.cartsItem.map((item) => {
        if (item._id === action.payload) {
          item.qty -= 1;
        }
      });
    },
  },
});

export const { addItem, clearCart, removeItem, incrementQty, decrementQty } =
  cartSlice.actions;

export default cartSlice.reducer;
