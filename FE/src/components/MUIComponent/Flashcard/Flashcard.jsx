import React, { useState, useEffect } from "react";
import TypoText from "../TypoText";
import "./Flashcard.css";

const Flashcard = ({ term, definition }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    // use '!isFlipped' instead of 'true'
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleFlip}>
      <div
        className={`card ${isFlipped ? "isFlipped" : ""}`}
        style={{ marginBottom: 0 }}
      >
        <div className="card-front">
          <TypoText variant="h2" style={{ padding: "3em" }}>
            {term}
          </TypoText>
        </div>
        <div className="card-back">
          <TypoText variant="h2" style={{ padding: "3em" }}>
            {definition}
          </TypoText>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
