import React, { useState,useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DeleteCoreLabel(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const isAuth = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/user/current", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.roleId !== "ADMIN") {
          navigate("/error");
        }
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.log("Can not get the user data");
    }
  };
  useEffect(() => {
    isAuth();
  }, []);
  async function deleteLabel(target) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/labels/deleteL?id=${target}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box>
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to delete this labels?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone. Do you wish to delete this core label?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => {
                            handleClose();
                            deleteLabel(props.target);
                        }} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <IconButton onClick={handleClickOpen} aria-label="delete" >
                <DeleteIcon />
            </IconButton>
        </>
    )
}