import Box from "@mui/material/Box";
import { React } from "react";
import Link from "../../components/MUIComponent/Link";
import A from "../../common/assets";
import ProfileButton from "../../components/MUIComponent/ProfileButton";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccountSetting = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <Box
        component="form"
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
        <Link href={`${role==="ADMIN"?"/admin":"/dashboard"}`} color={A.colors.black}>
          <i class="fa-solid fa-arrow-left fa-xl"></i>
        </Link>
        <Avatar alt="User default avatar" src="/img/avatar.png" style={{
          "width": "45%",
          "height": "45%",
          "margin": " 0 auto"
        }} />
        <Link href="/profile" hoverColor="white" color={A.colors.black} style={{ width: "auto" }}>
          <ProfileButton style={{ marginBlock: "2em 0" }}>
            My Profile
          </ProfileButton>
        </Link>
        <Link href="/changepw" hoverColor="white" color={A.colors.black} style={{ width: "auto" }}>
          <ProfileButton>
            Change Password
          </ProfileButton>
        </Link>
        {role !== "ADMIN" &&
          <Link href="/deactive" hoverColor="white" color={A.colors.black}  style={{ width: "auto" }}>
            <ProfileButton >
              Deactive
            </ProfileButton>
          </Link>
        }
      </Box>
    </>
  );
};

export default AccountSetting;