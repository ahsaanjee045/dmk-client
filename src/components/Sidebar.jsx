import {
    AddCircle,
    AddShoppingCart,
    Category,
    ListAlt,
} from "@mui/icons-material";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

let sidebarLinks = [
    {
        icon: AddCircle,
        text: "Add New Product",
        path: "/admin/addProduct",
    },
    {
        icon: AddShoppingCart,
        text: "List All Products",
        path: "/admin/products",
    },
    {
        icon: Category,
        text: "Add New Category",
        path: "/admin/addCategory",
    },
    {
        icon: ListAlt,
        text: "Orders",
        path: "/admin/orders",
    },
];

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Box
            className="sidebar-container"
            sx={{
                width: {
                    xs: "90px",
                    md: "230px",
                },
                borderRight: "2.5px solid #e5e2e2",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <List>
                {sidebarLinks.map((link) => {
                    let { icon: Icon, text, path } = link;
                    return (
                        <ListItemButton
                            key={text}
                            onClick={() => {
                                navigate(path);
                            }}
                        >
                            <ListItem>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        "& span": {
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        },
                                    }}
                                >
                                    {text}
                                </ListItemText>
                            </ListItem>
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
};

export default Sidebar;
