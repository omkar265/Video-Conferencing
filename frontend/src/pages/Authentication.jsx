import React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Snackbar from "@mui/material/Snackbar";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AuthContext } from "../contexts/AuthContext";


const defaultTheme = createTheme();


export default function Authentication() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false);


    const { handleRegister, handleLogin } = React.useContext(AuthContext);


    const handleAuth = async () => {

        try {

            // Login
            if (formState === 0) {

                const result = await handleLogin(
                    username,
                    password
                );

                console.log(result);
            }

            // Register
            else if (formState === 1) {

                const result = await handleRegister(
                    name,
                    username,
                    password
                );

                console.log(result);

                setUsername("");
                setPassword("");
                setName("");

                setMessage(result);
                setOpen(true);

                setError("");

                setFormState(0);
            }

        } catch (err) {

            console.log(err);

            const errorMessage =
                err?.response?.data?.message ||
                "Something went wrong";

            setError(errorMessage);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>

            <Grid
                container
                component="main"
                sx={{ height: "100vh" }}
            >

                <CssBaseline />


                {/* LEFT SIDE */}

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random?wallpapers)",

                        backgroundRepeat: "no-repeat",

                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[50]
                                : theme.palette.grey[900],

                        backgroundSize: "cover",

                        backgroundPosition: "center",
                    }}
                />


                {/* RIGHT SIDE */}

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,

                            display: "flex",

                            flexDirection: "column",

                            alignItems: "center",
                        }}
                    >

                        {/* LOCK ICON */}

                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: "secondary.main",
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>


                        {/* SIGN IN / SIGN UP */}

                        <div>

                            <Button
                                variant={
                                    formState === 0
                                        ? "contained"
                                        : "text"
                                }

                                onClick={() => {
                                    setFormState(0);
                                    setError("");
                                }}
                            >
                                Sign In
                            </Button>


                            <Button
                                variant={
                                    formState === 1
                                        ? "contained"
                                        : "text"
                                }

                                onClick={() => {
                                    setFormState(1);
                                    setError("");
                                }}
                            >
                                Sign Up
                            </Button>

                        </div>


                        {/* FORM */}

                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1 }}
                        >

                            {/* FULL NAME */}

                            {formState === 1 && (

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth

                                    id="name"

                                    label="Full Name"

                                    name="name"

                                    value={name}

                                    autoFocus

                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            )}


                            {/* USERNAME */}

                            <TextField
                                margin="normal"
                                required
                                fullWidth

                                id="username"

                                label="Username"

                                name="username"

                                value={username}

                                autoFocus={formState === 0}

                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />


                            {/* PASSWORD */}

                            <TextField
                                margin="normal"
                                required
                                fullWidth

                                name="password"

                                label="Password"

                                type="password"

                                id="password"

                                value={password}

                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />


                            {/* ERROR MESSAGE */}

                            <p style={{ color: "red" }}>
                                {error}
                            </p>


                            {/* LOGIN / REGISTER BUTTON */}

                            <Button
                                type="button"

                                fullWidth

                                variant="contained"

                                sx={{
                                    mt: 3,
                                    mb: 2,
                                }}

                                onClick={handleAuth}
                            >

                                {formState === 0
                                    ? "Login"
                                    : "Register"}

                            </Button>

                        </Box>

                    </Box>

                </Grid>

            </Grid>


            {/* SUCCESS SNACKBAR */}

            <Snackbar
                open={open}

                autoHideDuration={4000}

                onClose={() => setOpen(false)}

                message={message}
            />

        </ThemeProvider>
    );
}