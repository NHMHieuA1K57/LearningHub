import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import Alert from '@mui/material/Alert';

const ResetPass = () => {
  const location = useLocation();
  const regx = `^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$`;
  const data = location.state;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [correct, setCorect] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const navigate = useNavigate();

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };


  const handleNewp = (e) => {
    setnewPassword(e.target.value);
  }
  const handleRep = (e) => {
    setReNewPassword(e.target.value);
  }
  const handleOnChange = () => {
    if (newPassword === reNewPassword) {
      if (newPassword === "" || reNewPassword === "") {
        setReNewPassword('');
        setnewPassword('');
        setErrorMessage("Verification password or new password are not empty.Please try again!")
      } else if (!newPassword.match(regx)) {
        setErrorMessage("password is not in right format. Password must contain number, letter (both upper and lower) and has at least 8 character. No space character are allowed")
      }
      else {
        fetchSaveData();
      }
    } else {
      setReNewPassword('');
      setnewPassword('');
      setErrorMessage("Verification password and new password are not the same.Please try again!")
    }
  };
  const Data = {
    email: data,
    password: newPassword
  }

  async function fetchSaveData() {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/reset/password",
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data)
        }
      );
      if (response.ok) {
        const res = await response.json();
        setErrorMessage("");
        setSuccessMessage(res.message)
        setCorect(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      style={{
        width: "25rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#eaeaea",
        padding: "35px",
      }}
    >
      <TypoText variant="h1" style={{ margin: "0" }}>
        Change password🔑
      </TypoText>
      <TypoText variant="h5">
        Change your current password to a more secure one
      </TypoText>
      <Box
        noValidate
        sx={{ mt: 1, margin: "0 22px" }}
      >

        <TextField
          required
          fullWidth
          label="New password"
          type="password"
          value={newPassword}
          onChange={handleNewp}
        />
        <TextField
          required
          fullWidth
          value={reNewPassword}
          label="Confirm new password"
          type="password"
          style={{ marginBottom: "1em" }}
          onChange={handleRep}
        />
        {errorMessage && (
          <Alert severity="warning" style={{ marginBottom: "1em" }}>{errorMessage}</Alert>
        )}
        {successMessage && (
          <Alert severity="success" style={{ marginBottom: "1em" }}>{successMessage}</Alert>
        )}
        <Grid container spacing={2} justifyContent="right" sx={{ justifyContent: 'center' }}>
          <Grid item xs={6} textAlign="right">
            <Button variant="cancel" onClick={handleCancel}>Cancel</Button>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Button onClick={handleOnChange}>Change</Button>
          </Grid>
          {correct && <TypoText variant="h5" style={{ marginTop: '10px' }}>
            Please <Link to={{
              pathname: '/login'
            }}>Click here</Link>  to log in
          </TypoText>}
        </Grid>
      </Box>
    </div>
  );
};

export default ResetPass;
