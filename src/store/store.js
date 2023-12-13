import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import categorySlice from "../slices/categorySlice";
import productSlice from "../slices/productSlice";

const store = configureStore({
    // manager
    reducer: {
        userState: authSlice,
        categoryState: categorySlice,
        productState: productSlice,
    },
});

export default store;
