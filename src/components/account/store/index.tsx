import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./../reducer";
const store = configureStore({
    reducer: {
      accountReducer
    },
  });
  export default store;