import { Delete, Edit, Image } from "@mui/icons-material";
import {
    IconButton,
    TableCell,
    TableRow,
    Modal,
    Box,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import { deleteProduct, updateProduct } from "../slices/productSlice";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import InputWithLabel from "./InputWithLabel";
import { getAllCategory } from "../slices/categorySlice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "600px",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
    overflowY: "scroll",
};

const INITIAL_PRODUCT_STATE = {
    name: "",
    category: "",
    price: 0,
    brand: "",
    inStock: 0,
    description: "",
    image: "",
};

const ProductRow = ({ product, index, loading }) => {
    const [imageName, setImageName] = useState("");
    const [modalData, setModalData] = useState(INITIAL_PRODUCT_STATE);
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => {
        setModalData({
            name: product.name,
            category: product.category._id,
            price: product.price,
            brand: product.brand,
            inStock: product.inStock,
            description: product.description,
            image: product.image,
        });

        setModalOpen(true);
    };
    const handleModalClose = () => setModalOpen(false);

    const dispatch = useDispatch();
    const {
        user: { token },
    } = useSelector((state) => state.userState);

    const { categories } = useSelector((state) => state.categoryState);

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        if (modalData.image === product.image) {
            dispatch(
                updateProduct({
                    token,
                    productId: product._id,
                    data: {
                        ...modalData,
                    },
                })
            );
        } else {
            let formdata = new FormData();

            for (const property in modalData) {
                formdata.append(property, modalData[property]);
            }

            dispatch(
                updateProduct({
                    token,
                    data: formdata,
                    productId: product._id,
                })
            );
        }
        setModalData(INITIAL_PRODUCT_STATE)
        dispatch(getAllCategory())
        handleModalClose()
    };

    return (
        <>
            <TableRow
                key={product._id}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell align="center">
                    <img
                        style={{
                            height: "60px",
                            width: "60px",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                        src={"http://localhost:8000/" + product?.image}
                        alt=""
                    />
                </TableCell>
                <TableCell align="left">{product?.name}</TableCell>
                <TableCell align="left">₹{product?.price}</TableCell>
                <TableCell align="left">{product?.inStock}</TableCell>
                <TableCell align="left">
                    {product?.category?.categoryName}
                </TableCell>
                <TableCell align="left">
                    <IconButton
                        onClick={handleModalOpen}
                        sx={{
                            bgcolor: "#17b417",
                            borderRadius: "0",
                            color: "white",
                            ":hover": {
                                bgcolor: "#0d7c0d",
                            },
                        }}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        disabled={loading}
                        onClick={() => {
                            dispatch(
                                deleteProduct({
                                    productId: product._id,
                                    token: token,
                                })
                            );
                        }}
                        sx={{
                            bgcolor: "#dc153b",
                            borderRadius: "0",
                            color: "white",
                            ":hover": {
                                bgcolor: "#c61133",
                            },
                        }}
                    >
                        {loading ? (
                            <ClipLoader size={20} color="#fff" />
                        ) : (
                            <Delete />
                        )}
                    </IconButton>
                </TableCell>
            </TableRow>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box component={"form"} mt={2}>
                        <InputWithLabel
                            value={modalData.name}
                            onChange={(e) =>
                                setModalData({
                                    ...modalData,
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
                                    value={modalData.category}
                                    onChange={(e) =>
                                        setModalData({
                                            ...modalData,
                                            category: e.target.value,
                                        })
                                    }
                                    sx={{
                                        mt: "8px",
                                        "& div, & input": {
                                            borderRadius: "2px",
                                        },
                                    }}
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
                                value={modalData.price}
                                onChange={(e) =>
                                    setModalData({
                                        ...modalData,
                                        price: e.target.value,
                                    })
                                }
                                label={"Price"}
                                placeholder={"Enter Price"}
                            />
                        </Box>
                        <InputWithLabel
                            value={modalData.brand}
                            onChange={(e) =>
                                setModalData({
                                    ...modalData,
                                    brand: e.target.value,
                                })
                            }
                            label={"Brand Name"}
                            placeholder={"Enter Brand name"}
                        />
                        <InputWithLabel
                            value={modalData.inStock}
                            onChange={(e) =>
                                setModalData({
                                    ...modalData,
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
                                value={modalData.description}
                                onChange={(e) =>
                                    setModalData({
                                        ...modalData,
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
                                    setModalData({
                                        ...modalData,
                                        image: e.target.files[0],
                                    });
                                    setImageName(e.target.files[0].name);
                                }}
                                type="file"
                                accept="image/*"
                                hidden
                                id="product-image"
                            />
                            {imageName ? (
                                <Box mt={2}>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={2}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Selected Image Name :
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            {imageName}
                                        </Typography>
                                    </Box>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            document
                                                .getElementById("product-image")
                                                .click();
                                        }}
                                        variant="outlined"
                                        sx={{
                                            mt: 1,
                                            fontSize: "12px",
                                            border: "1px solid black",
                                            borderRadius: "0",
                                            color: "#000",
                                            ":hover": {
                                                border: "1px solid black",
                                                borderRadius: "0",
                                                color: "#000",
                                            },
                                        }}
                                        size="small"
                                    >
                                        Change Image
                                    </Button>
                                </Box>
                            ) : (
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
                                                transition:
                                                    "all 0.3s ease-in-out",
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
                            )}
                        </Box>
                        <Box
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Button
                                type="button"
                                onClick={handleUpdateProduct}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#000",
                                    borderRadius: "0",
                                    ":hover": {
                                        bgcolor: "#000",
                                    },
                                }}
                            >
                                Update Product
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ProductRow;
