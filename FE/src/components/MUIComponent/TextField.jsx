import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ ...props }) => {
  return (
    <MuiTextField
      defaultValue={props.defaultValue}
      InputProps={{
        style: {
          width: "100%",
          border: "none",
          borderRadius: "15px",
          backgroundColor: "#f5f5f5",
          fontSize: "16px",
          color: "#333333",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          fontFamily: "inter, sans-serif",
          margin: "5px 0",
        },
      }}
      {...props}
    />
  );
};

export default TextField;