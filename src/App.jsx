import { CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import AddProduct from "./pages/AddProduct";
import ProductPanel from "./pages/ProductPanel";
import AddCategory from "./pages/AddCategory";
import Orders from "./pages/Orders";
import { getAllCategory } from "./slices/categorySlice";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./slices/productSlice";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllProducts());
    }, []);

    return (
        <div>
            <Toaster />
            <CssBaseline />
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<DashboardLayout />}>
                        <Route index element={<AddProduct />} />
                        <Route path="addProduct" element={<AddProduct />} />
                        <Route path="products" element={<ProductPanel />} />
                        <Route path="addCategory" element={<AddCategory />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
