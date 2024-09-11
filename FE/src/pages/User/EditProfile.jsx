import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/MUIComponent/Button/Button";
import TextField from "../../components/MUIComponent/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypoText from "../../components/MUIComponent/TypoText";
import A from "../../common/assets";
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { styled } from "styled-components";

const SkeletonBox = styled.div`
width:50%;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
top: 10%;
right: 0;
text-align: center;
`;
const EditProfile = () => {
  const [user, setUser] = useState("");
  const [err, setErr] = useState("");
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [nameE, setNameE] = useState("");
  const [phoneE, setPhoneE] = useState("");
  const [success, setSuccess] = useState("");
  function isPhoneNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
    for (const element of char) {
      if (isNaN(element)) {
        return false;
      }
    }
    return true;
  }
  const onNameChange = (e) => {
    setName(e.target.value);
  }
  const onPhoneChange = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length <= 8) {
      setPhoneE("This phone number must be more than 8");
    }
    else if (!isPhoneNumber(e.target.value)) {
      setPhoneE("this field can not contain any letter");
    } else {
      setPhoneE("");
    }

  }
  const Data = {
    email: user.email,
    realName: name,
    phoneNum: phone,
    password: user.password,
    roleId: user.roleId,
    active: true,
    signupDate: user.signupDate,
  }
  const onSubmitHandle = async () => {
    try {
      if (name !== "" && phone !== "" && isPhoneNumber(phone)) {
        const res = await fetch("http://localhost:8080/api/v1/user/profile", {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data)
        });
        const json = await res.json();
        if (json.status === "Success") {
          setSuccess("Data update successfully");
        } else {
          setSuccess("");
        }
      }
    } catch (err) {
      setErr("Can not get the user data");
    }
  }
  const getCurrent = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/user/current", {
        method: "GET",
        credentials: "include",
      });
      const json = await res.json();
      if (json.email !== null) {
        setUser(json);
        setName(json.realName);
        setPhone(json.phoneNum);

      } else {
        setErr("User data not found ");
      }
    } catch (err) {
      setErr("Can not get the user data");
    }
  }
  useEffect(() => {
    getCurrent();
  }, [])
  const navigate = useNavigate();


  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      {err !== "" || name == null || phone == null ?
        <SkeletonBox>
          <Stack spacing={1} style={{ display: "inline-block" }}>
            <Alert severity="error">{err}</Alert>
            <Skeleton variant="rectangular" width={400} height={500} />
          </Stack>
        </SkeletonBox> :
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
            Edit Profile 📝
          </TypoText>
          <TypoText variant="h5">Change anything you want except email</TypoText>
          <Box
            sx={{ mt: 1, margin: "0 22px" }}
          >
            <label style={{ color: A.colors.disabled }}>
              <TypoText
                variant="h5"
                style={{
                  textAlign: "left",
                  marginBlock: "2em 0",
                }}
              >
                Email
                <TextField
                  disabled
                  fullWidth
                  value={user.email}
                  name="email"
                  type="text"
                  id="email"
                />
              </TypoText>
            </label>
            <label>
              <TypoText
                variant="h5"
                style={{
                  textAlign: "left",
                  marginBlock: "0.5em 0",
                }}
              >
                Full Name
                <TextField
                  required
                  fullWidth
                  name="name"
                  defaultValue={name}
                  onChange={onNameChange}
                  type="text"
                  id="name"
                />
                {name === "" &&
                  <Alert severity="warning">This field can not be empty</Alert>}
              </TypoText>
            </label>
            <label>
              <TypoText
                variant="h5"
                style={{
                  textAlign: "left",
                  marginBlock: "0.5em 0",
                }}
              >
                Phone Number
                <TextField
                  required
                  fullWidth
                  name="phone"
                  defaultValue={phone}
                  onChange={onPhoneChange}
                  type="text"
                  id="phone"
                />
                {phone === "" &&
                  <Alert severity="warning">This field can not be empty</Alert>}
                {phoneE !== "" &&
                  <Alert severity="warning">{phoneE}</Alert>}
              </TypoText>
            </label>
            <label>
              <TypoText
                variant="h5"
                style={{
                  textAlign: "left",
                  marginBlock: "0.5em 0",
                }}
              >
                Registered date
                <TextField
                  disabled
                  required
                  fullWidth
                  name="name"
                  value={user.signupDate}
                  type="date"
                  id="name"
                  style={{ marginBottom: "2em" }}
                /></TypoText>
              {success !== "" &&
                <Alert severity="success" style={{marginBottom: "1rem"}}>{success}</Alert>
              }
            </label>

            <Grid container spacing={2} justifyContent="right">
              <Grid item xs={6} textAlign="right">
                <Button variant="cancel" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="left">
                <Button onClick={onSubmitHandle}>Change</Button>
              </Grid>
            </Grid>
          </Box>

        </div>

      }
    </>
  );
};

export default EditProfile;