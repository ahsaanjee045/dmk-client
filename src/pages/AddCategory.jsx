import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../slices/categorySlice";
import { ClipLoader } from "react-spinners";

const AddCategory = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("");
    const { loading, error } = useSelector((state) => state.categoryState);

    return (
        <Box
            sx={{
                bgcolor: "red",
                padding: "20px",
                backgroundColor: "#fafafa",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Box
                sx={{
                    bgcolor: "white",
                    borderRadius: "15px",
                    padding: "15px",
                }}
            >
                <Box
                    sx={{
                        pb: "8px",
                        borderBottom: "2.5px solid #e5e2e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "15px",
                            fontWeight: "bold",
                        }}
                    >
                        Category Information
                    </Typography>
                    <Button
                        onClick={() => {
                            dispatch(
                                createCategory({ categoryName: category })
                            );
                            
                            setCategory("");
                        }}
                        variant="contained"
                        sx={{
                            borderRadius: "0",
                            bgcolor: "black",
                            ":hover": {
                                bgcolor: "black",
                            },
                        }}
                    >
                        {loading ? (
                            <ClipLoader size={35} color="#000" />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </Box>
                <Box mt={"20px"}>
                    <InputWithLabel
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label={"Category Name"}
                        placeholder={"Enter Category Name"}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AddCategory;
