import React, { useState } from "react";
import { Avatar, Grid, Paper, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import { loginData } from "../servicer/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = {
      Email: email,
      password: password,
    };
    try {
      const response = await loginData(values);
      console.log(response);
      if (response.status === 200) {
        navigate("/home");
      } else {
        console.error("Login failed:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

    setEmail("");
    setPassword("");
  };

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "100px auto",
  };

  const avatarStyle = { backgroundColor: "#16aaac" };

  return (
    <Grid>
      <Paper elevation={4} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockClockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <Grid container spacing={2} justifyContent="center" direction="column">
          <Grid item>
            <TextField
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                style: { color: "#16aaac" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#16aaac",
                  },
                },
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                style: { color: "#16aaac" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#16aaac",
                  },
                },
              }}
            />
          </Grid>
          <Grid item>
            <Link href="#" underline="none">
              {"Forgot Your Password?"}
            </Link>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              onClick={handleLogin}
              sx={{
                backgroundColor: "#16aaac",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#16aaac",
                },
                "&:active": {
                  backgroundColor: "#16aaac",
                },
                marginBottom: "16px",
              }}
              fullWidth
              variant="contained"
            >
              Login
            </Button>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Grid item sx={{ color: "#16aaac" }}>
                {"Don't have an account?"}
              </Grid>
              <Grid item>
                <Link href="/register" underline="none">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
