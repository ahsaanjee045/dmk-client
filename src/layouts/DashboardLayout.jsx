import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    return (
        <Box
            sx={{
                minHeight: "90vh",
            }}
        >
            <Box
                sx={{
                    height: "90vh",
                    display: "flex",
                    borderTop: "2.5px solid #e5e2e2",
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
