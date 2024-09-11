import React, { useState } from "react";
import TypoText from "../../components/MUIComponent/TypoText";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DeleteOutline, Edit } from "@mui/icons-material";
import "./CardList.css"; // Import the CSS file for styling
const Item = styled(Paper)(() => ({
  textAlign: "left",
  padding: "10px 20px",
  color: "black",
  height: "100%",
}));
const CardList = ({
  counter,
  handleTermChange,
  handleDefinitionChange,
  handleDeleteCard,
  term,
  definition,
}) => {
  const handleTermInputChange = (event) => {
    const termValue = event.target.value;
    handleTermChange(termValue, counter);
  };

  const handleDefinitionInputChange = (event) => {
    const definitionValue = event.target.value;
    handleDefinitionChange(definitionValue, counter);
  };

  const handleDelete = () => {
    handleDeleteCard(counter);
  };

  return (
    <div className="card-row" style={{ marginTop: "2em" }}>
      <div className="card-header">
        <TypoText style={{ margin: 0 }} variant="h4">
          {counter}
        </TypoText>
        <div className="card-icons">
          <IconButton onClick={handleDelete}>
            <DeleteOutline className="card-icon" />
          </IconButton>
        </div>
      </div>

      <div className="card-body">
        <Box className="card-list" sx={{ flexGrow: 1, border: "none" }}>
          <Grid container spacing={0}>
            <Grid item xs={7} sx={{ borderRight: "1px solid #888" }}>
              <Item>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "70%" }}
                >
                  <Input
                    id="standard-adornment-term"
                    aria-describedby="standard-term-helper-text"
                    inputProps={{
                      "aria-label": "TERM",
                    }}
                    placeholder="Enter term"
                    value={term} // Use the received 'term' prop as the value for the input field
                    onChange={(e) => handleTermChange(e.target.value)}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    TERM
                  </FormHelperText>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "70%" }}
                >
                  <Input
                    id="standard-adornment-definition"
                    aria-describedby="standard-definition-helper-text"
                    inputProps={{
                      "aria-label": "DEFINITION",
                    }}
                    placeholder="Add a description..."
                    value={definition} // Use the received 'definition' prop as the value for the input field
                    onChange={(e) => handleDefinitionChange(e.target.value)}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    DEFINITION
                  </FormHelperText>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default CardList;
