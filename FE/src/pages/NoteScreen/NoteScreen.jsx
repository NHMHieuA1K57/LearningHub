import { useRef, useState, useEffect } from "react";
import Kanban from "../../components/Kanban/Kanban";
import EditableDiv from "./EditTableDiv";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CountCard from "./CountCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import LabelsList from "../../components/MUIComponent/LabelList";
import { styled } from "styled-components";
import { Alert, Stack } from "@mui/material";
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"

const ErrBox = styled.div`
width:50%;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
top: 10%;
right: 0;
text-align: center;
`;

function NoteScreen() {
  const [isHovered, setIsHovered] = useState(false);
  const [id, setId] = useSearchParams();
  const noteId = id.get("id");
  const [isAuthen, setIsAuthen] = useState("");
  const [countCardKey, setCountCardKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const kanbanRef = useRef(null);
  const updateTimeoutRef = useRef(null); // Thêm một ref để lưu trữ timeout ID
  const [role, setRole] = useState(localStorage.getItem("role"));


  const checkAuthen = () => {

    fetch(`http://localhost:8080/api/v1/note?id=${Number(noteId)}`, {
      credentials: "include",
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "Success") {
          setIsAuthen("ok");
        } else {
          setIsAuthen("no");
        }
      })
      .catch((err) => console.log(err));

  };


  const handleOnChange1 = (newData) => {
    const countKey = `${newData}`;
    setCountCardKey(countKey);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {

    const kanbanElement = kanbanRef.current;
    const observer = new MutationObserver(() => {
      if (!isUpdating) {
        setIsUpdating(true);

        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current); // Hủy bỏ timeout cũ nếu có
        }
        
        updateTimeoutRef.current = setTimeout(() => {
          setCountCardKey((prev) => prev + 1);
          setIsUpdating(false);
        }, 200);
      }
    });

    if (kanbanElement) {
      observer.observe(kanbanElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      if (kanbanElement) {
        
        observer.disconnect();
      }

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current); // Hủy bỏ timeout nếu component bị unmount
      }
    };
  }, [isAuthen]);
  useEffect(checkAuthen,[]);
  const navigate = useNavigate();
  const handleBack = () => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  };
 

  if (isAuthen==="ok") {
    return (
      <>
      <Header />
        <div>
          <Box
            sx={{
              fontWeight: "bold",
              marginLeft: 3,
            }
            }
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
            {
              isHovered && (
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
              )
            }
          </Box>
          <Container fixed marginTop={15} style={{ paddingTop: 30 }}>
            <EditableDiv param={noteId} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 2,
                border: "2px solid #E1E1E1",
                borderRadius: "10px",
                marginTop: 2,
                backgroundColor: "#FAFAFA",
                "&:hover": {
                  border: "2px solid #1981C1",
                  cursor: "pointer",
                },
              }}
            >
              <InfoIcon color="primary" sx={{ marginRight: 1 }} />
              <Typography variant="subtitle1">
                A single page to help you stay on top of all the moving parts. This
                note is currently includes task tracker board and label list for you
                so you customize it on your own!
              </Typography>
            </Box>
            <hr style={{ backgroundColor: "#E0E0E0", height: "2px" }} />
            <CountCard countCardKey={countCardKey} id={noteId} />
            <hr style={{ backgroundColor: "#E0E0E0", height: "2px" }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 2 }}>
              📊 Task tracker
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 2,
                border: "2px solid #E1E1E1",
                borderRadius: "10px",
                marginTop: 2,
                backgroundColor: "#FAFAFA",
                "&:hover": {
                  border: "2px solid #1981C1",
                  cursor: "pointer",
                },
              }}
            >
              <InfoIcon color="primary" sx={{ marginRight: 1 }} />
              <Typography variant="subtitle1">
                Click on any card to view and update details. Click{" "}
                <strong>+</strong> to add tasks. Drag and drop cards to move tasks
                through the stages.
              </Typography>
            </Box>
          </Container>
          <Box ref={kanbanRef}>
            <Kanban countCardKey={countCardKey} id={noteId} />
          </Box>
          <Container fixed>
            <LabelsList boardID={noteId} onchangedata1={handleOnChange1} />
          </Container>
        </div >
        <Footer />
      </>
    )
  } else if(isAuthen==="no"){
    return (
      <>
        <ErrBox>
          <Stack spacing={1} style={{ display: "inline-block" }}>
            <Alert severity="error">You do not have permission to access this note!</Alert>
          </Stack>
        </ErrBox>
      </>
    );
  }
}

export default NoteScreen;
