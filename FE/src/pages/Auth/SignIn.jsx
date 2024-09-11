import React, { useState, useRef } from "react";
import { Route, useNavigate } from "react-router-dom";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Link from "../../components/MUIComponent/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import A from "../../common/assets";
import { Link as DomLink } from "react-router-dom";
import UserDashBoard from "../User/UserDashboard";
import { Alert } from "@mui/material";

const CustomLink = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <DomLink to={href} ref={ref} {...other} />;
});


const SignIn = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [errStat, setErrStat] = useState("");
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        credentials: "include", // Include session cookies
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        setRole(responseData.data[0].roleId);
        setErrorMessage("");
        setIsAuthenticated(true);
      }
      else {
        const errorData = await response.json();
        setErrorMessage(errorData.data);
        setErrStat(response.status);
        setEmail(data.get("email"));
        passwordRef.current.value = "";
      }
    } catch (error) {
      console.log("Error:", error.data);
    }
  };
  if (isAuthenticated) {
    if (role === "ADMIN") {
      localStorage.setItem("role", role);
      return (navigate("/admin"));
    } else {
      return (
        navigate("/dashboard")
      );
    }

  }

  return (
    <>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: "25rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#eaeaea",
          padding: "35px",
        }}
      >
        <Link href="/" color={A.colors.black}>
          <i class="fa-solid fa-arrow-left fa-xl"></i>
        </Link>
        <TypoText variant="h1" style={{ margin: "0" }}>
          Welcome Back
        </TypoText>
        <TypoText variant="h5">
          Make a new doc to bring your words, data, and much more. For free.
        </TypoText>

        <TextField required fullWidth id="email" label="Email" name="email" />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          inputRef={passwordRef}
        />

        <Link
          component={CustomLink}
          href="/forgotpassword"
          style={{ textAlign: "right", color: A.colors.link }}
        >
          Forgot password?
        </Link>

        <Button style={{ width: "100%" }}>Sign In</Button>
        {errorMessage && (
          <Alert severity="error" style={{ "marginTop": "1rem" }}>{errorMessage}
            {
              errStat === 401 ? (<Link href={"/reactive?email="+email}>Want to reactive account?</Link>) : ""
            }
          </Alert>
        )}

        <Grid container justifyContent="center">
          <Grid item>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <Grid item>
                <TypoText variant="h5" style={{ textAlign: "center", margin: 0 }}>
                  Don't have an account?
                </TypoText>
              </Grid>
              <Grid item>
                <Link
                  component={CustomLink}
                  href="/signup"
                  style={{ color: A.colors.link }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;
