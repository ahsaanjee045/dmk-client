import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const getUserFromLocalStorage = () => {
    let user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

axios.defaults.baseURL = "http://localhost:8000/api/v1";

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }) => {
        try {
            let res = await axios.post("/user/register", {
                username,
                email,
                password,
            });
            return res.data.data;
        } catch (error) {
            console.log("ERROR IN REGISTER FUNCTION IN AUTH SLICE", error);
            throw new Error(error.response.data.message || error.message);
        }
    }
);
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        try {
            let res = await axios.post("/user/login", {
                email,
                password,
            });
            return { user: res.data.data, token: res.data.token };
        } catch (error) {
            console.log("ERROR IN LOGIN FUNCTION IN AUTH SLICE", error);
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const getUserFromSession = createAsyncThunk(
    "auth/getUserFromSession",
    async () => {
        try {
            let res = await axios.get("/user/getuser", {
                withCredentials: true,
            });
            console.log("REsponse from google api", res);
            return { user: res.data.data };
        } catch (error) {
            console.log(
                "ERROR IN LOGIN WITH GOOGLE FUNCTION IN AUTH SLICE",
                error
            );
            throw new Error(error.response.data.message || error.message);
        }
    }
);

export const logoutAsync = createAsyncThunk("auth/logoutAsync", async () => {
    try {
        let res = await axios.get("/user/logout", {
            withCredentials: true,
        });
        if (res.data.success) {
            return true;
        }
        throw new Error("Cannot Logout!");
    } catch (error) {
        console.log("ERROR IN LOGOUT FUNCTION IN AUTH SLICE", error);
        throw new Error(error.response.data.message || error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        success: false,
        user: getUserFromLocalStorage(),
        loading: false,
        error: null,
    },
    // reducers must be purely synchronous
    reducers: {
        // action creator
        logoutSync: (state, action) => {
            state.user = null;
            state.error = null;
            state.loading = false;
            state.success = false;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = true;
            state.error = action.error.message;
        });
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = true;
            state.error = action.error.message;
        });
        builder.addCase(getUserFromSession.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserFromSession.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            window.location.href = "/"
        });
        builder.addCase(getUserFromSession.rejected, (state, action) => {
            state.loading = true;
            state.error = action.error.message;
        });
        builder.addCase(logoutAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logoutAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = null;
            localStorage.removeItem("user");
            toast.success("Logged Out Successfully");
        });
        builder.addCase(logoutAsync.rejected, (state, action) => {
            state.loading = true;
            state.error = action.error.message;
        });
    },
});

export default authSlice.reducer;
export const { logoutSync } = authSlice.actions;
