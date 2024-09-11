import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert/Alert';
import { Box } from '@mui/material';

export default function ArchiveColumn(props) {
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState("");
    const styled = {
        "cursor": "pointer"
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    async function archive(target) {
        try {
            console.log(target)
            const response = await fetch(
                `http://localhost:8080/api/v1/note/column?id=${target}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const json = await response.json();
            if (response.ok) {
                if (json.status === "Success") {
                    window.location.reload(false);
                }
            } else {
                setErr(json.message);
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
                        {"Do you want to delete this column?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone. Do you wish to delete this column?
                            You can also be lost your cards if they are in the deleted column!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => {
                            archive(props.target);
                        }} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                    {err !== "" ? <Alert severity="error" >{err}</Alert> : ""}
                </Box>
            </Dialog>
            <Button variant="outlined" onClick={handleClickOpen}>
                <DeleteIcon style={styled} fontSize="small" />
            </Button>
        </>
    )
}