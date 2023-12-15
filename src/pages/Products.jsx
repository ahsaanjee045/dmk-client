import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

import ProductCard from "../components/ProductCard";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { filterProducts } from "../utils/utils";

const Products = () => {
    const { products, loading, error } = useSelector(
        (state) => state.productState
    );
    const { categories } = useSelector((state) => state.categoryState);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 5000]);

    const handlePriceChange = (e, newValue) => {
        setPriceRange(newValue);
    };

    const handleSelectedCategories = (e) => {
        let _selectedCategories = [...selectedCategories];
        if (e.target.checked) {
            _selectedCategories.push(e.target.value);
        } else {
            let index = _selectedCategories.findIndex(
                (c) => c === e.target.value
            );
            _selectedCategories.splice(index, 1);
        }

        setSelectedCategories(_selectedCategories);
    };

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    let filteredProducts = filterProducts(
        products,
        searchTerm,
        selectedCategories,
        priceRange
    );
    // console.log(filteredProducts);

    return (
        <Box
            sx={{
                px: {
                    xs: "20px",
                    sm: "25px",
                    md: "40px",
                },
                pt: "50px",
                pb: "30px",
            }}
        >
            <Box display={"flex"}>
                <Box
                    sx={{
                        width: "30%",
                        px: "20px",
                    }}
                >
                    <Box
                        sx={{
                            p: "20px",
                            bgcolor: "white",
                        }}
                    >
                        <TextField
                            value={searchTerm}
                            onChange={handleSearchTerm}
                            placeholder="Search Products"
                            size="small"
                            fullWidth
                        />
                    </Box>

                    <Box
                        sx={{
                            p: "20px",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                }}
                            >
                                Filter By Category
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                mt: "15px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                            }}
                        >
                            {categories?.map((category) => {
                                return (
                                    <FormControlLabel
                                        // value={}
                                        onChange={handleSelectedCategories}
                                        label={category.categoryName}
                                        control={
                                            <Checkbox
                                                value={category.categoryName}
                                                onChange={
                                                    handleSelectedCategories
                                                }
                                            />
                                        }
                                    />
                                );
                            })}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            p: "20px",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                }}
                            >
                                Filter By Price
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                            }}
                        >
                            <Slider
                                onChange={handlePriceChange}
                                min={0}
                                max={5000}
                                step={200}
                                size="small"
                                value={priceRange}
                                valueLabelDisplay="auto"
                                getAriaValueText={() => "Price"}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "70%",
                        px: "20px",
                    }}
                >
                    <Box bgcolor={"white"}>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: "32px",
                                    fontWeight: "700",
                                    pl: "20px",
                                }}
                            >
                                Shop
                            </Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    pl: "20px",
                                }}
                            >
                                Showing {filteredProducts?.length} of {products?.length} results
                            </Typography>
                        </Box>
                        <Box>
                            <Grid container minHeight={"300px"}>
                                {filteredProducts?.map((product) => {
                                    return (
                                        <Grid
                                            mt={3}
                                            key={product._id}
                                            item
                                            xs={12}
                                            sm={6}
                                            lg={6}
                                            p="20px"
                                        >
                                            <ProductCard product={product} />
                                        </Grid>
                                    );
                                })}
                                {
                                    filteredProducts?.length < 1 && (
                                        <Grid xs={12}>
                                            <Typography variant="h6" sx={{
                                                fontSize : "14px",
                                                fontWeight : "bold",
                                                mt : "40px",
                                                textAlign : "center"
                                            }}>
                                                Sorry! No Product Found Matching your criteria.
                                            </Typography>
                                        </Grid>
                                    )
                                }
                                {loading && (
                                    <Grid
                                        item
                                        height={"300px"}
                                        display={"flex"}
                                        flex={1}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <ClipLoader color="#000" size={50} />
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Products;
