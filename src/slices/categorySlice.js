import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.withCredentials = true;

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async ({ categoryName }) => {
        try {
            let res = await axios.post("/category/create", {
                categoryName,
            });
            return res.data.data;
        } catch (error) {
            console.log(
                "ERROR IN CREATE CATEGORY FUNCTION IN CATEGORY SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        try {
            let res = await axios.get("/category");
            console.log("Category Response : ", res.data.data);
            return res.data.data;
        } catch (error) {
            console.log(
                "ERROR IN GET ALL CATEGORY FUNCTION IN CATEGORY SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    // reducers must be purely synchronous
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.categories?.push(action.payload);
            toast.success("Category Created.");
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(getAllCategory.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.categories = action.payload;
        });
        builder.addCase(getAllCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
        });
    },
});

export default categorySlice.reducer;
