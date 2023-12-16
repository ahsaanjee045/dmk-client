import { Delete, Edit } from "@mui/icons-material";
import {
    Box,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../slices/productSlice";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import ProductRow from "../components/ProductRow";



const ProductPanel = () => {
   
    const { products, loading, error } = useSelector(
        (state) => state.productState
    );

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    px: "20px",
                    py: "30px",
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                <Box
                    sx={{
                        pb: "5px",
                        borderBottom: "2px solid #e4e2e2",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            letterSpacing: "0.3px",
                        }}
                    >
                        All Products
                    </Typography>
                </Box>
                <Box mt={2}>
                    <TextField
                        sx={{
                            "& div, & input": {
                                borderRadius: "0",
                            },
                        }}
                        placeholder="Search Products"
                        size="small"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Box
                        mt={2}
                        sx={{
                            maxWidth: {
                                xs: "74vw",
                                md: "80vw",
                            },
                            display: "flex",
                            justifyContent: "flex-start",
                        }}
                    >
                        <TableContainer
                            component={Paper}
                            sx={{
                                width: "100%",
                                overflowX: "auto",
                                borderRadius: "0",
                            }}
                            elevation={4}
                        >
                            <Table sx={{ minWidth: 850 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                width: "50px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            S.No.
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: "bold",
                                                width: "100px",
                                            }}
                                        >
                                            Image
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                                width: "30%",
                                            }}
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Price
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            InStock
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Category
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products?.map((product, index) => {
                                        return (
                                            <ProductRow
                                                key={product._id}
                                                product={product}
                                                index={index}
                                                loading={loading}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProductPanel;
