import {
    Alert,
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import { Image } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../slices/categorySlice";
import { createProduct } from "../slices/productSlice";
import { ClipLoader } from "react-spinners";

const INITIAL_PRODUCT_STATE = {
    name: "",
    category: "",
    price: 0,
    brand: "",
    inStock: 0,
    description: "",
    image: "",
};

const AddProduct = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.productState);
    const { categories } = useSelector((state) => state.categoryState);
    const {
        user: { token },
    } = useSelector((state) => state.userState);

    const [productData, setProductData] = useState(INITIAL_PRODUCT_STATE);
    const [image, setImage] = useState("");

    const handleAddProduct = (e) => {
        e.preventDefault();
        let formData = new FormData();

        for (const property in productData) {
            formData.append(property, productData[property]);
        }
        console.log(formData.get("image"));
        dispatch(createProduct({ formData, token }));
        setProductData(INITIAL_PRODUCT_STATE);
    };

    // console.log(token)
    console.log(productData.image);

    return (
        <Box
            sx={{
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
                {error && (
                    <Alert
                        sx={{
                            my: "15px",
                        }}
                        severity="error"
                    >
                        {error}
                    </Alert>
                )}
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
                        Basic Information
                    </Typography>
                    <Button
                        onClick={handleAddProduct}
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
                            <ClipLoader color="#000" size={20} />
                        ) : (
                            "Save Product"
                        )}
                    </Button>
                </Box>
                <Box component={"form"} mt={2}>
                    <InputWithLabel
                        value={productData.name}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                name: e.target.value,
                            })
                        }
                        label={"Product Name"}
                        placeholder={"Enter Product Name"}
                    />
                    <Box
                        mb={"20px"}
                        sx={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                        }}
                    >
                        <Box flex={2} mb={"20px"}>
                            <InputLabel
                                sx={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                Category
                            </InputLabel>
                            <Select
                                value={productData.category}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        category: e.target.value,
                                    })
                                }
                                sx={{
                                    mt: "8px",
                                    "& div, & input": {
                                        borderRadius: "2px",
                                    },
                                }}
                                // placeholder="Enter Category Name"
                                size="small"
                                fullWidth
                            >
                                <MenuItem value={""}>
                                    --Select Category--
                                </MenuItem>
                                {categories.map((category) => {
                                    return (
                                        <MenuItem
                                            value={category._id}
                                            key={category._id}
                                        >
                                            {category.categoryName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Box>

                        <InputWithLabel
                            flex={1}
                            value={productData.price}
                            onChange={(e) =>
                                setProductData({
                                    ...productData,
                                    price: e.target.value,
                                })
                            }
                            label={"Price"}
                            placeholder={"Enter Price"}
                        />
                    </Box>
                    <InputWithLabel
                        value={productData.brand}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                brand: e.target.value,
                            })
                        }
                        label={"Brand Name"}
                        placeholder={"Enter Brand name"}
                    />
                    <InputWithLabel
                        value={productData.inStock}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                inStock: e.target.value,
                            })
                        }
                        label={"InStock"}
                        placeholder={"Enter Stock Number"}
                    />
                    <Box mb={"20px"}>
                        <InputLabel
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                            }}
                        >
                            Description
                        </InputLabel>
                        <TextField
                            value={productData.description}
                            onChange={(e) =>
                                setProductData({
                                    ...productData,
                                    description: e.target.value,
                                })
                            }
                            sx={{ mt: "8px" }}
                            placeholder="Enter Description"
                            fullWidth
                            multiline
                            rows={5}
                        />
                    </Box>
                    <Box mb={"20px"}>
                        <InputLabel
                            sx={{
                                fontSize: "13px",
                                fontWeight: "600",
                            }}
                        >
                            Product Image
                        </InputLabel>
                        <input
                            onChange={(e) => {
                                setProductData({
                                    ...productData,
                                    image: e.target.files[0],
                                });

                                let file = e.target.files[0];
                                let fileReader = new FileReader();
                                fileReader.onload = (e) => {
                                    setImage(e.currentTarget.result);
                                };

                                fileReader.onerror = (e) => {
                                    console.log(e);
                                    setImage("");
                                    setProductData({
                                        ...productData,
                                        image: "",
                                    });
                                };

                                fileReader.readAsDataURL(file);
                            }}
                            // multiple
                            type="file"
                            accept="image/*"
                            hidden
                            id="product-image"
                        />
                        {!productData.image ? (
                            <Box
                                onClick={() => {
                                    document
                                        .getElementById("product-image")
                                        .click();
                                }}
                                sx={{
                                    mt: "8px",
                                    border: "2px dashed #e5e2e2",
                                    padding: "40px 0",
                                    borderRadius: "7px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    ":hover .icon": {
                                        scale: "1.2",
                                    },
                                }}
                            >
                                <Box textAlign={"center"}>
                                    <Image
                                        className="icon"
                                        sx={{
                                            fontSize: "30px",
                                            color: "#898787",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "16px",
                                            color: "#898787",
                                        }}
                                    >
                                        Click Here to upload Image
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        mt: "10px",
                                        width: "200px",
                                        height: "200px",
                                        overflow: "hidden",
                                        border: "0.7px solid lightgray",
                                        borderRadius: "10px",
                                    }}
                                >
                                    {image && (
                                        <>
                                            <img
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                }}
                                                src={image}
                                                alt=""
                                                id="preview-image"
                                            />
                                        </>
                                    )}
                                    {!image && (
                                        <Box
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <ClipLoader
                                                size={20}
                                                color="#000"
                                            />
                                        </Box>
                                    )}
                                </Box>
                                {image && (
                                    <Button
                                        sx={{
                                            color: "black",
                                            fontSize: "13px",
                                            mt: "13px",
                                            border: "0.3px solid lightgray",
                                        }}
                                        variant="text"
                                        onClick={() => {
                                            document
                                                .getElementById("product-image")
                                                .click();
                                        }}
                                    >
                                        Change Image
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddProduct;
