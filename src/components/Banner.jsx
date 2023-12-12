import React from "react";
import banner from "../assets/banner.jpg";
import { Box, Typography, Button } from "@mui/material";

const Banner = () => {
    return (
        <Box
            sx={{
                px: {
                    xs: "20px",
                    sm: "25px",
                    md: "40px",
                },
                py: "20px",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    // vertical alignment
                    alignItems: "flex-end",
                    // justifyContent : "flex-start",
                    // width: "100%",
                    // bgcolor: "red",
                    height: {
                        xs: "400px",
                        md: "500px",
                        lg: "600px",
                    },
                    borderRadius: "15px",
                    padding: "20px",
                    backgroundImage: `url('${banner}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            lg: "row",
                        },
                        justifyContent: {
                            xs: "flex-start",
                            lg: "space-between",
                        },
                    }}
                >
                    <Box>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: "40px",
                                fontWeight: "700",
                                color: "white",
                            }}
                        >
                            TOLUS SPRING COLLECTION
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: "white",
                            }}
                        >
                            Find Out Our Best Spring Collection. Offering our
                            best quality product in a Tolus Spring Collection.
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            variant="text"
                            sx={{
                                color: "black",
                                bgcolor: "white",
                                px: 4,
                                borderRadius: "25px",
                                mt: 2,
                                fontSize: "12px",
                                ":hover": {
                                    bgcolor: "white",
                                },
                            }}
                        >
                            Buy Now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Banner;
