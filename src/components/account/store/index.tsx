import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./../reducer";
const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
  export default store;