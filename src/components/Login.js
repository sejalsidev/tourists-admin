import React, { useState } from "react";
import { Grid, Paper, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginData } from "../servicer/login";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    const values = {
      Email: Email,
      password: password,
    };
    const data = loginData(values).then((data) => {
      console.log("Received data:", data);
      if (data.status == 200) {
        navigate("/UserDetail");
      }
    });

    // alert(values);
    setEmail("");
    setPassword("");
  };
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: "1000px",
    margin: "100px auto",
    textAlign: "center",
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12}>
        <Paper elevation={4} style={paperStyle} variant="outlined">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <img
                src={require("../images/travel-img.jpg")}
                alt="Travel"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid align="center">
                <h2>Welcome to TravelIn</h2>
              </Grid>
              <Grid container spacing={2} justify="center" direction="column">
                <Grid item>
                  <TextField
                    className="textfield"
                    label="Email"
                    placeholder="Enter Email Id"
                    value={Email}
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
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    className="textfield"
                    label="Password"
                    placeholder="Enter Password"
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
                  ></TextField>
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{ color: "#16aaac" }}
                          value={rememberMe}
                          onValueChange={(newValue) => setRememberMe(newValue)}
                        />
                      }
                      label="Remembar Me"
                      style={{ color: "#16aaac" }}
                    />
                  </FormGroup>
                </Grid>
                <Grid item>
                  <Link href="#" underline="none">
                    {"Forgive Password?"}
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
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
