import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";
import { getSingleProduct } from "../slices/productSlice";

const SingleProductPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, product } = useSelector((state) => state.productState);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [id]);

    const handleAddToCart = async () => {
        let data = {
            productid: id,
            productName: product.productName,
            price: product.price,
            qty: qty,
        };

        try {
            let res = await addProductToCart(data);
            if (res) {
                alert("Product added to cart successfully");
                setQty(1);
            }
        } catch (error) {
            console.log("ERROR IN SINGLE PRODUCT COMPONENT", error);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ClipLoader size={30} color="#000" />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                px: {
                    xs: "20px",
                    sm: "25px",
                    md: "40px",
                },
                pt: "50px",
                pb: "70px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "50px",
                    minHeight: "450px",
                    maxHeight: "500px",
                }}
            >
                <Box
                    sx={{
                        flex: 1,

                        borderRadius: "20px",
                        overflow: "hidden",
                    }}
                >
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                        }}
                        src={"http://localhost:8000/" + product?.image}
                        alt=""
                    />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        pr: "150px",
                    }}
                >
                    {/* optional chaining */}
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: "25px",
                            fontWeight: "bold",
                        }}
                    >
                        {product?.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            my: "10px",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: "600",
                            }}
                        >
                            Brand :
                        </span>{" "}
                        {product?.brand}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            my: "10px",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: "600",
                            }}
                        >
                            Category :
                        </span>{" "}
                        {product?.category?.categoryName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            my: "10px",
                            fontSize: "22px",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: "600",
                            }}
                        >
                            Price :
                        </span>{" "}
                        ₹{product?.price}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            my: "10px",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: "600",
                            }}
                        >
                            Description :
                        </span>{" "}
                        <br />
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            my: "10px",
                        }}
                    >
                        {product?.description}
                    </Typography>

                    <Box
                        mt={2}
                        sx={{
                            display: "flex",
                            border: "1px solid lightgray",
                            width: "fit-content",
                        }}
                    >
                        <button
                            onClick={() => {
                                if (qty > 1) {
                                    setQty(qty - 1);
                                }
                            }}
                            style={{
                                padding: "8px 10px",
                                border: "none",
                                outline: "none",
                            }}
                        >
                            -
                        </button>
                        <input
                            value={qty}
                            disabled
                            style={{
                                padding: "8px 10px",
                                width: "60px",
                                border: "none",
                                outline: "none",
                                textAlign: "center",
                            }}
                            className="counter"
                            type="number"
                        />
                        <button
                            onClick={() => {
                                if (qty < 10) {
                                    setQty(qty + 1);
                                }
                            }}
                            style={{
                                width: "30px",
                                border: "none",
                                outline: "none",
                            }}
                        >
                            +
                        </button>
                    </Box>

                    <Button
                        onClick={handleAddToCart}
                        variant="text"
                        sx={{
                            mt: "30px",
                            bgcolor: "black",
                            color: "white",
                            borderRadius: "0",
                            ":hover": {
                                bgcolor: "black",
                                color: "white",
                            },
                        }}
                    >
                        Add To Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleProductPage;
