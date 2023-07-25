import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "../toolkit/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  cart: cartSlice,
});

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const toolkitStore = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(toolkitStore);
export { toolkitStore, persistor };

// export default toolkitStore;
