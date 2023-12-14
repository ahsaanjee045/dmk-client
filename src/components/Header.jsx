import {
    AccountCircle,
    ChildCare,
    Logout,
    Man,
    Menu as MenuIcon,
    ShoppingBagOutlined,
    Woman,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { logoutAsync } from "../slices/authSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userState);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleOpen = () => setDrawerOpen(true);
    const handleClose = () => setDrawerOpen(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        // div
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // px : "20px",
                px: {
                    xs: "20px",
                    sm: "25px",
                    md: "40px",
                },
                py: "10px",
            }}
        >
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                }}
            >
                <List sx={{ display: "flex" }}>
                    <ListItem
                        onClick={() => {
                            navigate("/products");
                        }}
                        sx={{
                            py: 0,
                            //px :8px
                            px: 1,
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        All
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            navigate("/products/men");
                        }}
                        sx={{
                            py: 0,
                            //px :8px
                            px: 1,
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Men
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            navigate("/products/women");
                        }}
                        sx={{
                            py: 0,
                            px: 1,
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Women
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Typography
                    component={Link}
                    to={"/"}
                    // to
                    sx={{
                        color: "inherit",
                        textDecoration: "none",
                    }}
                    variant="h2"
                    fontSize={"25px"}
                    fontFamily={"'Conquera'"}
                    fontWeight={"900"}
                >
                    TULOS
                </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <IconButton
                    onClick={() => {
                        user ? navigate("/cart") : navigate("/login");
                    }}
                    sx={{
                        ":hover": {
                            bgcolor: "#00000012",
                        },
                    }}
                >
                    <ShoppingBagOutlined
                        sx={{ color: "black", fontSize: "20px" }}
                    />
                </IconButton>
                {user ? (
                    <>
                        <Button
                            // title="Logout"
                            onClick={() => dispatch(logoutAsync())}
                            variant="text"
                            sx={{
                                color: "white",
                                fontSize: "13px",
                                bgcolor: "black",
                                ":hover": {
                                    bgcolor: "#000",
                                },
                                mt: "3px",
                                px: {
                                    xs: "4px",
                                    md: "12px",
                                },
                                minWidth: "40px",
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    display: {
                                        xs: "none",
                                        md: "inline-block",
                                    },
                                }}
                            >
                                Logout
                            </Typography>
                            {
                                <Logout
                                    sx={{
                                        display: {
                                            xs: "flex",
                                            md: "none",
                                        },
                                    }}
                                />
                            }
                        </Button>
                        <Typography
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                },
                            }}
                        >
                            Welcome, {user?.user?.username || "User"}
                        </Typography>
                        <IconButton
                            id="basic-button"
                            aria-controls={openMenu ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleCloseMenu();
                                    navigate("/profile");
                                }}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseMenu();
                                    navigate("/admin");
                                }}
                            >
                                Admin Panel
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        onClick={() => {
                            navigate("/login");
                        }}
                        variant="text"
                        sx={{
                            color: "black",
                            fontSize: "13px",
                            ":hover": {
                                bgcolor: "#00000012",
                            },
                            mt: "3px",
                        }}
                    >
                        Login
                    </Button>
                )}
                <IconButton
                    onClick={handleOpen}
                    sx={{
                        display: {
                            xs: "flex",
                            md: "none",
                        },
                    }}
                >
                    <MenuIcon
                        sx={{
                            color: "black",
                            fontSize: "27px",
                        }}
                    />
                </IconButton>
                <Drawer
                    anchor={"right"}
                    open={drawerOpen}
                    onClose={handleClose}
                >
                    <Box
                        sx={{
                            width: "250px",
                            px: "20px",
                            py: "10px",
                            // bgcolor : ""
                        }}
                        role="presentation"
                        onClick={handleClose}
                        onKeyDown={handleClose}
                    >
                        <Box sx={{}}>
                            <Typography
                                variant="h2"
                                fontSize={"25px"}
                                fontFamily={"'Conquera'"}
                                fontWeight={"900"}
                                textAlign={"right"}
                                mb={2}
                            >
                                TULOS
                            </Typography>
                            <Divider />
                            <List>
                                <ListItem sx={{ px: "0" }}>
                                    <ListItemButton sx={{ px: 0, pl: 1 }}>
                                        <ListItemIcon sx={{ minWidth: "35px" }}>
                                            <Man sx={{ color: "black" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="MEN" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{ px: "0" }}>
                                    <ListItemButton sx={{ px: 0, pl: 1 }}>
                                        <ListItemIcon sx={{ minWidth: "35px" }}>
                                            <Woman sx={{ color: "black" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="WOMEN" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{ px: "0" }}>
                                    <ListItemButton sx={{ px: 0, pl: 1 }}>
                                        <ListItemIcon sx={{ minWidth: "35px" }}>
                                            <ChildCare
                                                sx={{ color: "black" }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="KIDS" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
};

export default Header;
