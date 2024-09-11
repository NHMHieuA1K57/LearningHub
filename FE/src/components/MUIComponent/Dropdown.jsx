import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MUISelect } from "@mui/material";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

const Select = styled(MUISelect)(() => ({
  borderRadius: "15px",
  // boxShadow: "0 0 10px #888888",
  background: "white",
}));

/* function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
} */

export default function MultipleSelect({onChange, defaultValue}) {
  const [id, setId] = useSearchParams();
  const noteId = id.get("id");

  const [personName, setPersonName] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [label, setLabel] = useState([]);
  const [boardId, setBoardId] = useState(id.get("id"));
  const [selectedLabels, setSelectedLabels] = useState(defaultValue);
  
  useEffect(() => {
    const getBoardId = async () => {
      await fetch(`http://localhost:8080/api/v1/note/board?noteId=${noteId}`, {
        credentials: "include",
        method: "GET",
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setBoardId(jsonData.data.id);
        });
    };
    const getLabelsList = async () => {
      await fetch(
        `http://localhost:8080/api/v1/labels/getLabelsByBoardId?boardId=${boardId}`,
        {
          credentials: "include",
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          if (Array.isArray(jsonData)) { // Check if jsonData is an array
            const labelNames = jsonData.map((item) => item.name);
            setLabel(jsonData);
            setLabelName(labelNames);
          } else {
            console.error("Invalid JSON data:", jsonData);}
        });
    };
      getBoardId();
    getLabelsList();
  }, [noteId, boardId]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLabels(value);
    onChange(value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%", padding: "0 5px" }}>
        {/* <InputLabel id="demo-multiple-name-label">Label</InputLabel> */}
        <Select
        defaultValue={
          label
        }
      multiple
      value={selectedLabels}
      onChange={handleChange}
      renderValue={(selected) =>
        label
          .filter((l) => selected.includes(l.id))
          .map((l) => l.name)
          .join(", ")}
    >
          {label.map((l) => (
            <MenuItem
              key={l.id}
              value={l.id}
              backgroundColor={l.color}
              style={{
                "backgroundColor" : `${l.color}50`,
              }}
            >
              {l.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}