import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import A from "../../common/assets";

const ProfileButton = styled(Button)(() => ({
  marginTop: '0.5em',
  background: A.colors.white,
  color: A.colors.black,
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.26)",
  width: "100%",
  "&:hover": {
    background: A.colors.primary,
    color: A.colors.white,
  },
}));

export default ProfileButton;