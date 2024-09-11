import Box from "@mui/material/Box";
import { React, useState } from "react";
import Link from "../../components/MUIComponent/Link";
import A from "../../common/assets";
import Alert from '@mui/material/Alert';
import TypoText from "../../components/MUIComponent/TypoText";
import TextField from "../../components/MUIComponent/TextField";
import Button from '@mui/material/Button';
import { Style } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Reactive = () => {
    const [pass, setPass] = useState("");
    const [err, setErr] = useState("");
    const [params, setParams] = useSearchParams();
    const [role, setRole] = useState("");
    const nav = useNavigate();
    const email = params.get("email");

  const handleOnChange = (e) => {
    setPass(e.target.value);
  };
  async function logout() {
    localStorage.clear();
    await fetch("http://localhost:8080/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return <></>;
        }
      })
      .catch((err) => console.log(err));
  }
  const reactiveUser = async (email, pass) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/user/reactive?email=${email}&password=${pass}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (response.ok) {
        setErr("");
        nav("/login");
      }
      const json = await response.json();
      if (response.status !== 200) {
        setErr(json.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

    const onSummitHandle = async () => {
        try {
            await reactiveUser(email, pass);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Box
                sx={{
                    textAlign: "center",
                    width: "30%",
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
                <TypoText variant="h1">Welcome back 😍 </TypoText>
                <TypoText variant="h5">Please re-enter your password to re-active the account </TypoText>
                <TextField
                    fullWidth
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleOnChange}
                />
                {err !== "" &&
                    <Alert severity="error" style={{ width: "100%" }}>{err}</Alert>
                }
                <Button
                    size="large"
                    color="success"
                    style={{ marginTop: "1rem" }}
                    variant="contained"
                    onClick={() => {
                        pass !== "" && onSummitHandle()
                    }}>
                    Re-activate my account
                </Button>

            </Box>
        </>
    );
};

export default Reactive;