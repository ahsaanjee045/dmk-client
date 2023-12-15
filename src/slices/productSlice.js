import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.withCredentials = true;

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async ({ formData, token }) => {
        try {
            let res = await axios.post("/products/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data.data;
        } catch (error) {
            console.log(
                "ERROR IN CREATE PRODUCT FUNCTION IN PRODUCTS SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const getAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async () => {
        try {
            let res = await axios.get("/products");

            return res.data.data;
        } catch (error) {
            console.log(
                "ERROR IN GET ALL PRODUCTS FUNCTION IN PRODUCT SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const getSingleProduct = createAsyncThunk(
    "products/getSingleProduct",
    async (id) => {
        try {
            let res = await axios.get(`/products/${id}`);

            return res.data.data;
        } catch (error) {
            console.log(
                "ERROR IN GET SINGLE PRODUCTS FUNCTION IN PRODUCT SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
        product : null
    },
    // reducers must be purely synchronous
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.products?.push(action.payload);
            toast.success("Product Created.");
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload;
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(getSingleProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.product = action.payload;
        });
        builder.addCase(getSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
        });
    },
});

export default productSlice.reducer;
