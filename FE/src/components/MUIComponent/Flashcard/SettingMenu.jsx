import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import A from "../../../common/assets";

export default function SettingMenu({ onEdit, onRestart }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          padding: 0,
          justifyContent: "right",
          color: A.colors.primary,
        }}
      >
        <SettingsIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px #888888",
        }}
      >
        <MenuItem onClick={onEdit}>Edit</MenuItem>
        <MenuItem
          sx={{
            color: "red",
            "&:hover": {
              background: "red",
              color: "white",
            },
          }}
          onClick={onRestart}
        >
          Restart Flashcards
        </MenuItem>
      </Menu>
    </div>
  );
}
