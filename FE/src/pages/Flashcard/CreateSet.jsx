import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypoText from "../../components/MUIComponent/TypoText";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
} from "@mui/material";
import CardList from "./CardList";
import Header from "../../components/layout/Header";

const CreateSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionUser, setSessionUser] = useState("");
  const [cardListCount, setCardListCount] = useState(1);
  const [terms, setTerms] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [flashcardSetId, setFlashcardSetId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUserEmail();
  }, []);

  const navigateToViewSet = (id) => {
    const url = `/set?id=${id}&title=${encodeURIComponent(title)}`;
    navigate(url);
  };

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

  const createSet = async () => {
    const setRequestBody = {
      userId: sessionUser,
      title: title,
      description: description,
      createdDate: new Date().toISOString().split("T")[0],
      active: true,
      learned: false,
    };

    try {
      const createSetResponse = await fetch(
        "http://localhost:8080/api/v1/flashcard/set",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(setRequestBody),
        }
      );

      if (createSetResponse.ok) {
        const latestSetResponse = await fetch(
          "http://localhost:8080/api/v1/flashcard/set/latest",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (latestSetResponse.ok) {
          const latestSetData = await latestSetResponse.json();
          const setId = latestSetData.data.id;
          setFlashcardSetId(setId);

          // Create flashcards in the set
          for (let i = 0; i < cardListCount; i++) {
            const termValue = terms[i];
            const definitionValue = definitions[i];
            if (
              termValue !== null &&
              termValue !== "" &&
              definitionValue !== null &&
              definitionValue !== ""
            ) {
              const cardListRequestBody = {
                setId: setId,
                term: termValue,
                definition: definitionValue,
                position: i,
              };
              await createFlashcard(cardListRequestBody);
            }
          }
          navigateToViewSet(setId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createFlashcard = async (requestBody) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/flashcard/card",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSet = async () => {
    if (!title) {
      alert("Please enter the set title!");
      return;
    }

    if (cardListCount < 2) {
      alert("Please add at least two cards to create the set!");
      return;
    }

    // đã nhập term hoặc definition thì phải có cái ngược lại
    // nếu cả hai đều null thì không add vào set
    for (let i = 0; i < cardListCount; i++) {
      if (terms[i] === "" || definitions[i] === "") {
        alert("Please fill all the terms and definitions!");
        return;
      }
    }

    await createSet();
    setTitle("");
    setDescription("");
    setTerms([]);
    setDefinitions([]);
  };

  const handleTermChange = (term, index) => {
    setTerms((prevTerms) => {
      const updatedTerms = [...prevTerms];
      updatedTerms[index] = term;
      return updatedTerms;
    });
  };

  const handleDefinitionChange = (definition, index) => {
    setDefinitions((prevDefinitions) => {
      const updatedDefinitions = [...prevDefinitions];
      updatedDefinitions[index] = definition;
      return updatedDefinitions;
    });
  };

  const handleAddCard = () => {
    setCardListCount((prevCount) => prevCount + 1);
    setTerms((prevTerms) => [...prevTerms, ""]);
    setDefinitions((prevDefinitions) => [...prevDefinitions, ""]);
  };

  const handleDeleteCard = (index) => {
    setCardListCount((prevCount) => prevCount - 1);
    setTerms((prevTerms) => {
      const newTerms = [...prevTerms];
      newTerms.splice(index - 1, 1);
      return newTerms;
    });
    setDefinitions((prevDefinitions) => {
      const newDefinitions = [...prevDefinitions];
      newDefinitions.splice(index - 1, 1);
      return newDefinitions;
    });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          padding: "3em 2.5rem",
          maxWidth: "81.25em",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TypoText variant="h1">Create a new study set</TypoText>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ background: "#9747ff", borderRadius: "5px" }}
              onClick={handleCreateSet}
              disabled={!title || cardListCount < 2}
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "50%" }}>
          <Input
            id="standard-adornment-weight"
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "TITLE",
            }}
            placeholder="Enter a title, like 'SWP391'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormHelperText id="standard-weight-helper-text">
            TITLE
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, mt: 1, width: "50%" }}>
          <Input
            id="standard-adornment-weight"
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "DESCRIPTION",
            }}
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormHelperText id="standard-weight-helper-text">
            DESCRIPTION
          </FormHelperText>
        </FormControl>
        {cardListCount > 0 &&
          [...Array(cardListCount)].map((_, index) => (
            <CardList
              key={index}
              counter={index + 1}
              handleTermChange={(term) => handleTermChange(term, index)}
              handleDefinitionChange={(definition) =>
                handleDefinitionChange(definition, index)
              }
              term={terms[index]}
              definition={definitions[index]}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
        <Grid item xs={4} sx={{ mt: 3, textAlign: "left" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ background: "#9747ff", borderRadius: "5px" }}
            onClick={handleAddCard}
          >
            + ADD CARD
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default CreateSet;
