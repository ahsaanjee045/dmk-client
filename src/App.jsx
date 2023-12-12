import { CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <div>
            <Toaster/>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
