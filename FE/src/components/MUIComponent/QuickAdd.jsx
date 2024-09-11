import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TypoText from "./TypoText";

const QuickAdd = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionUser, setSessionUser] = useState("");

  useEffect(() => {
    getCurrentUserEmail();
  }, []);

  const getCurrentUserEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/current",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      setSessionUser(json.email);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async () => {
    const requestBody = {
      title: title,
      description: description,
      userId: sessionUser,
      createdDate: new Date().toISOString().split("T")[0],
      active: true
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/note/notes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      // Handle the response here if needed
      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      // Handle error here
      console.log(error);
      return null;
    }
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async () => {
    if (!title) {
      alert("Please enter the note title!");
      return;
    }
    addNote();
    setTitle("");
    setDescription("");
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <>
      <Card
        onClick={handleAdd}
        sx={{
          margin: "0.5em 1.5em",
          width: 250,
          height: 150,
          cursor: "pointer",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <TypoText variant="h1">+</TypoText>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: "1rem" }}
          />
          <Button variant="contained" onClick={handleFormSubmit}>
            Add
          </Button>
          <Button variant="cancel" onClick={handleClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickAdd;
