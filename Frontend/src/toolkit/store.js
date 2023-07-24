import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "../toolkit/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
const rootReducer = combineReducers({
  cart: cartSlice,
});

const persistConfig = {
  key: "user",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const toolkitStore = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(toolkitStore);
export { toolkitStore, persistor };

// export default toolkitStore;
