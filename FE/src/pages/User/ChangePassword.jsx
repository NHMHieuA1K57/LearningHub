import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import Alert from '@mui/material/Alert';

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [oldPassword,setOldPassword] = useState();
  const [newPassword,setnewPassword] = useState();
  const [reNewPassword,setReNewPassword] = useState();
  const navigate = useNavigate();

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleOldp =(e)=>{
    setOldPassword(e.target.value);
  }
  const handleNewp =(e)=>{
    setnewPassword(e.target.value);
  }
  const handleRep =(e)=>{
    setReNewPassword(e.target.value);
  }
  const Data = {
    oldpass: oldPassword,
    verpass: reNewPassword,
    newpass: newPassword,
  }
  const handleOnChange = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/password",
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
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          label="Current password"
          type="password"
          onChange={handleOldp}
        />
        <TextField
          required
          fullWidth
          label="New password"
          type="password"
          onChange={handleNewp}
        />
        <TextField
          required
          fullWidth
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
        <Grid container spacing={2} justifyContent="right">
          <Grid item xs={6} textAlign="right">
            <Button variant="cancel" onClick={handleCancel}>Cancel</Button>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Button onClick={handleOnChange}>Change</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ChangePassword;
