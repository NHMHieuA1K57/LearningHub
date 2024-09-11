import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import TypoText from "../TypoText";
import "./FlashcardSet.css";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
import SettingMenu from "./SettingMenu";
import { useNavigate, useSearchParams } from "react-router-dom";

const FlashcardSet = ({ flashcards, title }) => {
  const [counter, setCounter] = useState(1);
  const [disabledRight, setDisabledRight] = useState(false);
  const [disabledLeft, setDisabledLeft] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handlePrevCard = () => {
    setCounter(counter - 1);
    setDisabledLeft(counter - 1 === 1);
    setDisabledRight(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNextCard = () => {
    setCounter(counter + 1);
    setDisabledRight(counter + 1 === flashcards.length);
    setDisabledLeft(false);
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleRestartSet = () => {
    setCounter(1);
    setDisabledLeft(true);
    setDisabledRight(false);
    setCurrentCardIndex(0);
  };

  const [name, setName] = useState(null);

  useEffect(() => {
    const uniqueSetId = [...new Set(flashcards.map((f) => f.setId))];
    const flSetName = flashcards.find((s) => s.setId === uniqueSetId);
    setName();
  }, [flashcards]);

  const [id, setId] = useSearchParams();
  const flashcardSetId = id.get("id");
  const nav = useNavigate();
  const handleEditSet = () => {
    nav(`/update-set?id=${flashcardSetId}`);
  };

  return (
    <div className="set">
      <div className="set-title" style={{ margin: "3em" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <TypoText variant="h1">{title}</TypoText>
          </Grid>
        </Grid>
      </div>
      <div className="flashcard-container">
        <Flashcard
          term={flashcards[currentCardIndex]?.term}
          definition={flashcards[currentCardIndex]?.definition}
        />
      </div>
      <Grid
        container
        spacing={2}
        sx={{ width: "50em", margin: "0 auto", marginY: "1em" }}
        style={{ alignItems: "center" }}
      >
        <Grid item sm={3} style={{ padding: 0 }}>
          <div className="nothing" />
        </Grid>
        <Grid item sm={6} className="progress-arrow" style={{ padding: 0 }}>
          <div className="">
            <button onClick={handlePrevCard} disabled={disabledLeft}>
              <i className="fa-solid fa-arrow-left fa-2xl"></i>
            </button>
            <TypoText style={{ display: "inline", margin: "1em" }}>
              {counter}/{flashcards.length}
            </TypoText>
            <button onClick={handleNextCard} disabled={disabledRight}>
              <i className="fa-solid fa-arrow-right fa-2xl"></i>
            </button>
          </div>
        </Grid>
        <Grid item sm={3} sx={{ textAlign: "right" }} style={{ padding: 0 }}>
          <div className="setting-icon" style={{ margin: 0 }}>
            <SettingMenu onEdit={handleEditSet} onRestart={handleRestartSet} />
          </div>
        </Grid>
      </Grid>
      <div>
        <ProgressBar flashcards={flashcards} counter={counter} />
      </div>
    </div>
  );
};

export default FlashcardSet;
