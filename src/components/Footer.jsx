import React from "react";
import { Box, Button, Typography } from "@mui/material";

let quickLinks = [
    {
        heading: "Products",
        links: ["Tshirt", "Jackets", "Shoes", "Pants"],
    },
    {
        heading: "Categories",
        links: ["Men", "Women", "Kids", "Gift"],
    },
    {
        heading: "Our Social Media",
        links: ["Instagram", "Facebook", "Youtube", "Twitter"],
    },
];

const Footer = () => {
    return (
        <Box component={"footer"}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: {
                        xs: "20px",
                        sm: "25px",
                        md: "40px",
                    },
                    py: "50px",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    gap : {
                        xs : "30px",
                        md : "0"
                    }
                }}
            >
                <Box display={"flex"} gap={2} flex={1} flexDirection={"column"}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "50px",
                            fontFamily: "'Conquera', sans-serif",
                            fontWeight: "900",
                        }}
                    >
                        TULOS
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: "15px",
                            color: "#747272",
                            fontWeight: 500,
                        }}
                    >
                        Get newsletter updates for upcoming product <br /> and
                        best discount for All Item.
                    </Typography>
                    <Box>
                        <input
                            placeholder="Your email"
                            type="text"
                            style={{
                                padding: "8px 12px",
                                borderRadius: "30px",
                                border: "1px solid black",
                                outline: "none",
                            }}
                        />
                        <Button
                            variant="text"
                            sx={{
                                padding: "6px 30px",
                                borderRadius: "50px",
                                outline: "none",
                                bgcolor: "black",
                                color: "white",
                                marginLeft: "7px",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        gap: {
                            xs : "50px",
                            md : "100px"
                        },
                        paddingInline: {
                            xs : "0",
                            md : "50px"
                        },
                        justifyContent: {
                            xs : "flex-start",
                            md : 'flex-end'
                        },
                       
                    }}
                >
                    {quickLinks.map((qlink) => {
                        return (
                            <Box key={qlink.heading}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {qlink.heading}
                                </Typography>
                                <Box mt={2}>
                                    {qlink.links.map((link) => {
                                        return (
                                            <Typography
                                                key={link}
                                                variant="subtitle2"
                                                sx={{
                                                    fontSize: "15px",
                                                    color: "#747272",
                                                    // fontWeight: "",
                                                }}
                                            >
                                                {link}
                                            </Typography>
                                        );
                                    })}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    bgcolor: "black",
                    color: "white",
                    px: {
                        xs: "20px",
                        sm: "25px",
                        md: "40px",
                    },
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            ":hover": {
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        }}
                    >
                        &copy; 2023 <span>Tulos Corporation</span>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Typography variant="subtitle2" sx={{ cursor: "pointer" }}>
                        Terms and Conditions
                    </Typography>
                    <Typography variant="subtitle2" sx={{ cursor: "pointer" }}>
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle2" sx={{ cursor: "pointer" }}>
                        Cookies Policy
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
