import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FlashcardSet from "../../components/MUIComponent/Flashcard/FlashcardSet";
import "../../components/MUIComponent/Flashcard/FlashcardSet.css";
import Header from "../../components/layout/Header";
import { Box, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import TypoText from "../../components/MUIComponent/TypoText";

const ViewSet = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [id, setId] = useSearchParams();
  const [title, setTitle] = useSearchParams();
  const flashcardSetId = id.get("id");
  const flashcardSetName = title.get("title");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState(window.localStorage.getItem("role"));

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleBack = () => {
    role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
  };

  useEffect(() => {
    const getFlashcardsOfSet = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/flashcard/card?id=${flashcardSetId}`,
        {
          credentials: "include",
        }
      );
      const jsonData = await response.json();
      setFlashcards(jsonData.data);
    };
    getFlashcardsOfSet();
  }, []);

  return (
    <div>
      <Header />

      <div className="card-flip">
        {/* <Box
          sx={{
            fontWeight: "bold",
            marginLeft: 3,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ArrowBackIcon
            onClick={handleBack}
            fontSize="large"
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "#F2F2F2",
                borderRadius: "7px",
              },
            }}
          />
          {isHovered && (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "white",
                width: "75px",
                height: "30px",
                backgroundColor: "#767676",
                p: 0.4,
                borderRadius: "7px",
                position: "fixed",
                top: "35px",
                left: "10px",
              }}
            >
              Go back
            </Typography>
          )}
        </Box> */}
        <FlashcardSet flashcards={flashcards} title={flashcardSetName} />
      </div>
    </div>
  );
};

export default ViewSet;
