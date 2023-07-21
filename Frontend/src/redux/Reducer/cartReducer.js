import * as types from "../actionTypes";

let initialState = {
  errMsg: null,
  carts: [],
  getProduct: [],
};

export const cartreducer = (state = initialState, action) => {
  console.log("Action Payload", action);
  // console.log("cart:::", state.carts);

  switch (action.type) {
    case types.ADD_CART:
      // const finalItem = state?.carts?.map((item, index) => {
      //   if (item.id === action?.payload?.id) {
      //     item.qnty += 1;
      //   }
      //   return item;
      // });

      return {
        ...state,
        carts: [...state.carts, action.payload],
      };

    // const ItemIndex = state.carts.findIndex(
    //   (item) => item.id === action.payload.id
    // );
    // if (ItemIndex >= 0) {
    //   state.carts[ItemIndex].qnty += 1;
    //   return {
    //     ...state,
    //     carts: [...state.carts],
    //   };
    // } else {
    //   const temp = { ...action.payload, qnty: 1 };
    //   return {
    //     ...state,
    //     carts: [...state.carts, temp],
    //   };
    // }
    case types.INCREMENT:
      console.log("inside increment::", action.payload);

      let ADD = state.carts.map((item) => {
        if (item?._id === action.payload._id) {
          item.qty++;
        }
        return item;
      });
      // localStorage.setItem("cartData", JSON.stringify(ADD));
      return { ...state, carts: ADD };

    case types.REMOVE_CART:
      const data = state.carts.filter((el) => el._id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    // case types.DECREMENT:
    //   const IteamIndex_dec = state.carts.findIndex(
    //     (item) => item.id === action.payload.id
    //   );

    //   if (state.carts[IteamIndex_dec].qnty >= 1) {
    //     const dltiteams = (state.carts[IteamIndex_dec].qnty -= 1);
    //     return {
    //       ...state,
    //       carts: [...state.carts],
    //     };
    //   } else if (state.carts[IteamIndex_dec].qnty === 1) {
    //     const data = state.carts.filter((el) => el.id !== action.payload);
    //     return {
    //       ...state,
    //       carts: data,
    //     };
    //   }

    case types.DECREMENT:
      let SUB = state.carts.map((item) => {
        if (item?._id === action.payload._id && item.qty > 1) {
          item.qty--;
        }
        return item;
      });
      localStorage.setItem("cartData", JSON.stringify(SUB));
      return { ...state, carts: SUB };

    default:
      return state;
  }
};
