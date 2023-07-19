import * as types from "../actionTypes";

let initialState = {
  errMsg: null,
  carts: [],
};

export const cartreducer = (state = initialState, action) => {
  console.log("Action Payload", action);
  // console.log("cart:::", state.carts);
  debugger;
  switch (action.type) {
    case types.ADD_CART:
      const finalItem = state?.carts?.map((item, index) => {
        if (item.id === action?.payload?.id) {
          item.qnty += 1;
        }
        return item;
      });

      return {
        ...state,
        carts: finalItem,
      };

    //   const ItemIndex = state.carts.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   console.log("ItemIndex", ItemIndex);
    //   if (ItemIndex >= 0) {
    //     state.carts[ItemIndex].qnty += 1;
    //     console.log("final cart::", state.carts);
    //     return {
    //       ...state,
    //       carts: [...state.carts],
    //     };
    //   } else {
    //   const temp = { ...action.payload, qnty: 1 };
    //   return {
    //     ...state,
    //     carts: [...state.carts, temp],
    //   };
    // }

    case types.REMOVE_CART:
      const data = state.carts.filter((el) => el.id !== action.payload);
      console.log("cart inside data ==>>", data);
      console.log("Remove cart data");
      return {
        ...state,
        carts: data,
      };

    case types.REMOVE_ONE:
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );

      if (state.carts[IteamIndex_dec].qnty >= 1) {
        const dltiteams = (state.carts[IteamIndex_dec].qnty -= 1);
        console.log([...state.carts, dltiteams]);

        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[IteamIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload);

        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};
