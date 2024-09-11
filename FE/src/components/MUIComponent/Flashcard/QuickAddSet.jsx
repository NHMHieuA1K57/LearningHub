import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import TypoText from "../TypoText";
import { useNavigate } from "react-router-dom";

const QuickAddSet = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionUser, setSessionUser] = useState("");

  useEffect(() => {
    getCurrentUserEmail();
  }, []);

  const navigate = useNavigate();

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
      active: true,
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
    navigate("/create-set");
  };

  const handleClose = () => {
    setOpen(false);
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
    </>
  );
};

export default QuickAddSet;
