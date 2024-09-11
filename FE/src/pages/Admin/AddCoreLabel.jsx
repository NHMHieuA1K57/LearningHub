import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import styled from "styled-components";
import TypoText from "../../components/MUIComponent/TypoText";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
export const Button = styled.button`
  background-color: white;
  color: white;
  margin: 5rem 1rem 5rem 0;
  width: 100%;
  flex: 0 0 2%;
  border-radius: 5px;
  background-color: #00000073;
  font-weight: 600;
  font-size: 20px;
  padding: 5px 10px;
  border: none;
`;
function AddCoreLabel() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    const handleOnClick = () => {
        const Data = {
            // Đối tượng bạn muốn truyền trong phần body
            name: name,
            color: color,
        };
        fetchSaveData(Data);
        setShow(false);
        window.location.reload(false);
    };

  async function fetchSaveData(Data) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/labels/createL",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.log("Lỗi:", error);
    }
  }
  return (
    <>
      {
        <Dialog open={show}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: "50%",
              left: "50%",
              position: "fixed",
              transform: "translate(-50%, -50%)",
              width: "300px",
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CloseIcon
              sx={{
                position: "relative",
                top: "-15px",
                left: "245px",
                cursor: "pointer",
              }}
              onClick={() => setShow(false)}
            />
            <TypoText
              variant="h2"
              color="black"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              New Label Name
            </TypoText>
            <TextField
              fullWidth
              label="Label Name"
              id="fullWidth"
              type="text"
              sx={{
                margin: "10px 0px",
              }}
              onChange={(event) => setName(event.target.value)}
            />
            <TypoText
              variant="h2"
              color="black"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Color
            </TypoText>
            <input
              type="color"
              style={{
                width: "100%",
                "margin-bottom": "1rem",
              }}
              onChange={(event) => setColor(event.target.value)}
            />
            <Box>
              <button
                style={{
                  fontSize: "16px",
                  color: "#fff",
                  lineHheight: "1.2",
                  textTransform: "uppercase",
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 20px",
                  background: "#D820FA",
                  border: "none",
                  borderRadius: "25px",
                }}
                onClick={handleOnClick}
              >
                Save
              </button>
            </Box>
          </Box>
        </Dialog>
      }
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={() => setShow(!show)} />
      </Fab>
    </>
  );
}
export default AddCoreLabel;