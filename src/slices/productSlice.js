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

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async ({ productId, token }) => {
        try {
            let res = await axios.delete(`/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                return res.data.data;
            }
            return Promise.reject("Error while deleting product");
        } catch (error) {
            console.log(
                "ERROR IN DELETE SINGLE PRODUCTS FUNCTION IN PRODUCT SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async({ productId, token, data }) => {
        try {
            let res = await axios.put(`/products/${productId}`, data, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            return res.data.data
        } catch (error) {
            console.log(
                "ERROR IN UPDATE SINGLE PRODUCTS FUNCTION IN PRODUCT SLICE",
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
        product: null,
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
            state.error = action.error;
        });
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            // state.product = action.payload;
            let pIndex = state.products.findIndex(
                (p) => p._id === action.payload._id
            );
            if (pIndex !== -1) {
                state.products.splice(pIndex, 1);
                toast.success("Product Delete Successfully!");
            }
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(updateProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            
            let pIndex = state.products.findIndex(
                (p) => p._id === action.payload._id
            );
            if (pIndex !== -1) {
                state.products.splice(pIndex, 1, action.payload);
                toast.success("Product Updated Successfully!");
            }
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export default productSlice.reducer;
