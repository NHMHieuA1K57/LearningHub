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
import TypoText from "../TypoText";
import MenuListComposition from "../MenuList";
import QuickAddSet from "./QuickAddSet";

const RecentlyVisitedSet = () => {
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

  /* fetch API to show all sets */
  const [sets, setFlashcardSets] = useState([]);
  const [sessionUser, setSessionUser] = useState("");

  useEffect(() => {
    const getAllSets = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/flashcard/set",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const jsonData = await response.json();
        if (jsonData.status === "Success" && jsonData.data) {
          setFlashcardSets(jsonData.data);
        }
      } catch (error) {
        console.log(error);
        setFlashcardSets([]);
      }
    };

    const fetchNotes = async () => {
      const sessionUser = await Current();
      if (sessionUser != null) {
        await getAllSets();
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

  const archiveNote = async (setId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/flashcard/set?id=${setId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setFlashcardSets((prevSets) =>
          prevSets.filter((set) => set.id !== setId)
        );
        console.log("Set deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting set: " + error);
    }
  };

  const navigate = useNavigate();
  const navToNoteScreen = (setId, title) => {
    navigate(`/set?id=${setId}&title=${title}`);
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
        {sets.map((set) => {
          return (
            <Card
              onClick={(e) => {
                if (e.target.tagName !== "BUTTON") {
                  navToNoteScreen(set.id, set.title);
                }
              }}
              // key={id}
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
                    <TypoText variant="h3">{set.title}</TypoText>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <MenuListComposition
                      onDelete={(e) => {
                        e.stopPropagation(); // Stop event propagation
                        archiveNote(set.id);
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
        <QuickAddSet />
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

export default RecentlyVisitedSet;
