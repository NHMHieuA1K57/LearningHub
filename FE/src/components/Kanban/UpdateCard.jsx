import Grid from "@mui/material/Grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import styled from "styled-components";
import MultipleSelect from "../MUIComponent/Dropdown";
import TextField from "../MUIComponent/TextField";
import TypoText from "../MUIComponent/TypoText";
import dayjs from "dayjs";
import { Button, Dialog } from "@mui/material";
import CheckList from "../../pages/NoteScreen/CheckList";

const AddTaskPopup = styled(Grid)`
  background: white;
  width: calc(100% - 40px);
  max-width: 1000px;
  min-width: 300px;
  box-shadow: 0 0 10px #888888;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 68px 68px;
`;

export default function UpdateCard({ task, onClose }) {
  const [showAddScreen, setShowAddScreen] = useState(false);
  const [name, setName] = useState(task.data.card.name);
  const [label, setLabel] = useState(task.data.labels);
  const [description, setDescription] = useState(task.data.card.description);
  const [startDate, setStartDate] = useState(
    dayjs(task.data.card.dateStart, "YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs(task.data.card.dateEnd, "YYYY-MM-DD")
  );
  const [duration, setDuration] = useState("");

  const handleEndDateChange = (newValue) => {
    if (startDate && newValue.isBefore(startDate)) {
      setEndDate("");
      setDuration(0);
      console.log("End date must be greater than start date");
    } else {
      setEndDate(newValue);
      calculateDuration(startDate, newValue);
    }
  };

  const calculateDuration = (start, end) => {
    if (start && end) {
      const diff = end.diff(start, "day");
      if (diff > 1) {
        setDuration(diff + " days");
      } else {
        setDuration(diff + " day");
      }
    } else {
      setDuration(0);
    }
  };

  const handleAdd = () => {
    setShowAddScreen(true);
  };

  const handleClose = () => {
    setShowAddScreen(false);
    onClose();
  };

  const handleUpdateChange = async () => {

    const requestBody = {
      card: {
        id: task.data.card.id,
        columnId: task.data.card.columnId,
        name: name,
        description: description ? description : null,
        dateStart: startDate ? dayjs(startDate, "MM-DD-YYYY").format("YYYY-MM-DD") : null,
        dateEnd: endDate ? dayjs(endDate, "MM-DD-YYYY").format("YYYY-MM-DD") : null,
        isActive: true,
        createdDate: new Date().toISOString().split("T")[0],
      },
      labels: label,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/note/card", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const jsonData = response.json();
      } else {
        console.log("UpdateCard: Error in response");
      }
    } catch (error) {
      console.log("UpdateCard: ", error);
    }

    handleClose();
    window.location.reload(false);
  };

  return (
    <>
      <AddTaskPopup
        container
        spacing={0.5}
        alignItems="center"
        sx={{
          background: "white",
          width: "calc(100%-40px)",
          maxWidth: "1000px",
          minWidth: "300px",
          boxShadow: "0 0 10px #888888",
          borderRadius: "5px",
          padding: "68px 68px",
        }}
      >
        <Grid item xs={8}>
          <TypoText
            variant="h5"
            style={{
              color: "#a1a1a1",
              fontWeight: "bold",
              padding: "0 5px",
              marginBottom: 0,
            }}
          >
            NAME
          </TypoText>
          <TextField
            required
            fullWidth
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ borderRadius: "8px", padding: "0 5px" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TypoText
            variant="h5"
            style={{
              color: "#a1a1a1",
              fontWeight: "bold",
              padding: "0 5px",
              marginBottom: 0,
            }}
          >
            LABEL
          </TypoText>
          <MultipleSelect
            value={label}
            options={label}
            onChange={(selectedLabels) => setLabel(selectedLabels)}
            defaultValue={label}
          />
        </Grid>
        <Grid item xs={12}>
          <TypoText
            variant="h5"
            style={{
              color: "#a1a1a1",
              fontWeight: "bold",
              padding: "0 5px",
              marginBottom: 0,
            }}
          >
            DESCRIPTION
          </TypoText>
          <TextField
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ width: "100%", padding: "0 5px" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TypoText
            variant="h5"
            style={{
              color: "#a1a1a1",
              fontWeight: "bold",
              padding: "0 5px",
              marginBottom: 0,
            }}
          >
            START DATE
          </TypoText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%", borderRadius: "15px", padding: "0 5px" }}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <TypoText
            variant="h5"
            style={{
              color: "#a1a1a1",
              fontWeight: "bold",
              padding: "0 5px",
              marginBottom: 0,
            }}
          >
            END DATE
          </TypoText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%", borderRadius: "15px", padding: "0 5px" }}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <TypoText
            variant="h5"
            style={{
              color: "#a1a1a1",
              fontWeight: "bold",
              padding: "0 5px",
              marginBottom: 0,
            }}
          >
            DURATION
          </TypoText>
          <TextField
            disabled
            value={duration}
            sx={{ width: "100%", padding: "0 5px" }}
          />
        </Grid>
        <CheckList id={task.data.card.id}/>
        <Grid item xs={11} sx={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            sx={{ margin: "1.5rem 10px" }}
            size="large"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" size="large" onClick={handleUpdateChange}>
            Update
          </Button>
        </Grid>
      </AddTaskPopup>
    </>
  );
}
