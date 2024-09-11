import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import {
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import TypoText from "./TypoText";
import MenuList from "../MUIComponent/MenuList";
import QuickAdd from "./QuickAdd";

const RecentlyVisited = () => {
  const Current = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/current",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /* fetch API to show all notes */
  const [notes, setNotes] = useState([]);
  const [sessionUser, setSessionUser] = useState("");

  useEffect(() => {
    const getListNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/note/notes",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const jsonData = await response.json();
        if (jsonData.status === "Success" && jsonData.data) {
          setNotes(jsonData.data);
        }
      } catch (error) {
        console.log(error);
        setNotes([]);
      }
    };

    const fetchNotes = async () => {
      const sessionUser = await Current();
      if (sessionUser != null) {
        await getListNotes();
      }
    };
    fetchNotes();

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

  const editNote = async (noteId, title, description) => {
    const requestBody = {
      id: noteId,
      title: title,
      description: description,
      userId: sessionUser,
      createdDate: new Date().toISOString().split("T")[0],
      active: true,
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/note", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const jsonData = await response.json();
      if (response.ok) {
        console.log(jsonData.message);
        setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === noteId) {
            // return with a new title and desc
            return { ...note, title, description };
          } else {
            return note;
          }
        })
      );
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const archiveNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/note/notes?noteId=${noteId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      if (response.ok) {
        console.log(jsonData.message);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      }
    } catch (error) {
      console.log("Archive note error: " + error);
    }
  };

  const navigate = useNavigate();
  const navToNoteScreen = (noteId) => {
    navigate(`/note?id=${noteId}`);
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleOpenDialog = (noteId, title, description) => {
    setSelectedNoteId(noteId);
    setTitle(title);
    setDescription(description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* number of cards = number of notes */}
        {notes.map((note) => {
          const { id, title, description, active } = note;
          if (active) {
            return (
              <Card
                onClick={(e) => {
                  if (e.target.tagName !== "BUTTON") {
                    navToNoteScreen(id);
                  }
                }}
                key={id}
                sx={{
                  margin: "0.5em 1.5em",
                  width: 250,
                  height: 150,
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TypoText variant="h3">{title}</TypoText>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MenuList
                        onEdit={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(id, title, description);
                        }}
                        onDelete={(e) => {
                          e.stopPropagation(); // Stop event propagation
                          archiveNote(id);
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          } else {
            return null; // Don't render inactive notes
          }
        })}
        <QuickAdd />
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              editNote(selectedNoteId, title, description);
              handleClose();
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecentlyVisited;
