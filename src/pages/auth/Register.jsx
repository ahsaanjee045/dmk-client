import { useState } from "react";
import { Alert, Avatar, Button, Link as MuiLink } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link, Navigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/authSlice";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <MuiLink color="inherit" href="https://mui.com/">
                Your Website
            </MuiLink>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
    const dispatch = useDispatch();
    const { loading, error, success, user } = useSelector(
        (state) => state.userState
    );

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!registerData.username.trim() || !registerData.email.trim()) {
            toast.error("All fields are required");
            return;
        }
        dispatch(register(registerData));
    };

    if (success || user) {
        return <Navigate to={"/login"} />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "black" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        textAlign={"center"}
                        component="h1"
                        variant="h5"
                        mt={2}
                        fontWeight={"700"}
                    >
                        Sign up to create new <br /> account.
                    </Typography>
                    {error && (
                        <Alert sx={{ mt: "15px" }} severity="error">
                            {error}
                        </Alert>
                    )}
                    <Box
                        component={"form"}
                        sx={{ mt: 3 }}
                        onSubmit={handleSignup}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    type="text"
                                    size="small"
                                    value={registerData.username}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    size="small"
                                    value={registerData.email}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    size="small"
                                    value={registerData.password}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: "0",
                                bgcolor: "black",
                                ":hover": {
                                    backgroundColor: "#232222de",
                                },
                            }}
                        >
                            Sign Up
                        </Button>

                        <Grid container justifyContent={"center"}>
                            <Grid item>OR</Grid>
                        </Grid>
                        <Button
                            onClick={() => {
                                window.open(
                                    "http://localhost:8000/api/v1/user/login/google",
                                    "_self"
                                );
                            }}
                            fullWidth
                            variant="contained"
                            sx={{
                                py: "15px",
                                mt: 3,
                                mb: 2,
                                borderRadius: "0",
                                bgcolor: "black",
                                ":hover": {
                                    backgroundColor: "#232222de",
                                },
                            }}
                        >
                            <GoogleIcon
                                sx={{
                                    // marginLeft
                                    mr: "8px",
                                }}
                            />{" "}
                            Continue With Google
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <MuiLink
                                    component={Link}
                                    to={"/login"}
                                    variant="body2"
                                >
                                    Already have an account? Sign in
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
