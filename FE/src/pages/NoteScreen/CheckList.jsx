import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import TextField from "../../components/MUIComponent/TextField";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

function CheckList({ id }) {
  const [progress, setProgress] = useState(0);
  const [add, setAdd] = useState(false);
  const [lists, setLists] = useState([]);
  const [parameter, setParameter] = useState(0);
  const [showButtons, setShowButtons] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [archive, setArchive] = useState(false);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [showEdits, setShowEdits] = useState([]);
  const wrapperRef = useRef(null);
  const [name, setName] = useState("");
  const editContentRefs = useRef([]);
  const editRefs = useRef([]);
  const [checked, setChecked] = useState([]);
  const [countChecked, setCountChecked] = useState(0);
  const [cardid, setCardid] = useState(id);

  useEffect(() => {
    fetchData(cardid);
  }, [parameter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowButtons(Array(lists.length).fill(false));
      }

      if (
        editRefs.current &&
        !editRefs.current.some((ref) => {
          if (ref.current !== null) {
            return ref.current.contains(event.target);
          }
        })
      ) {
        setShowEdits(Array(lists.length).fill(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lists]);

  //Gọi API lấy danh sách checklist
  async function fetchData(cardid, archive) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/checklists?cardid=${cardid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      const l = data.data.map((list) => ({
        id: list.id,
        name: list.name,
        checked: list.checked,
      }));

      const l1 = data.data
        .filter((list) => list.checked === true)
        .map((list) => ({
          id: list.id,
          name: list.name,
          checked: list.checked,
        }));

      const check = l
        .filter((list) => list.checked !== true)
        .map((list) => list.id);

      setChecked([...check]);

      if (l.length === 0) {
        setProgress(0);
        setShowButton(false);
      } else {
        if (check.length > 0) {
          setShowButton(true);
          setCountChecked(check.length);
        } else {
          setShowButton(false);
        }
        setProgress(Math.floor((check.length / l.length) * 100));
      }
      console.log(archive);
      if (archive) {
        setLists(l1);
      } else {
        setLists(l);
      }
      setShowButtons(Array(l.length).fill(false));
      setShowEdits(Array(l.length).fill(false));
      editContentRefs.current = Array(l.length)
        .fill(null)
        .map(() => React.createRef());
      editRefs.current = Array(l.length)
        .fill(null)
        .map(() => React.createRef());
    } catch (error) {
      console.log("Lỗi:", error);
    }
  }

  //Gọi API archive 1 checklist
  async function fetchArchiveData(parameter) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/checklists/archive?id=${parameter}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await response.json();
      fetchData(cardid, archive);
    } catch (error) {
      console.log("Lỗi:", error);
    }
  }

  //Gọi API xóa toàn bộ checklist của 1 card
  async function fetchDeleteData(parameter) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/checklists/checklist?cardid=${parameter}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      fetchData(cardid, archive);
    } catch (error) {
      console.log("Lỗi:", error);
    }
  }

  //Gọi API xóa 1 checklist của 1 card
  async function fetchDeleteCheckListData(parameter) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/checklists?id=${parameter}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      fetchData(cardid, archive);
    } catch (error) {
      console.log("Lỗi:", error);
    }
  }
  //Hàm gọi api,cập nhật lại dữ liệu 1 checklist
  async function fetchSaveData(postData) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/checklists", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      fetchData(cardid, archive);
    } catch (error) {
      setError1(true);
      console.log("Lỗi:", error);
    }
  }

  //Gọi api,tạo 1 checklist
  async function fetchCreateData(postData) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/checklists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      fetchData(cardid, archive);
    } catch (error) {
      console.log("Lỗi:", error);
    }
  }

  //Giải quyết sự kiến ấn vào nút save
  const handleSaveClick = (index, id) => {
    const editedName = sanitizeInput(
      editContentRefs.current[index].current.innerText
    );

    if (editedName.length == 0) {
      handleDeleteCheckList(id);
    } else if (editedName.length > 0 && editedName.length < 100) {
      const postData = {
        // Đối tượng bạn muốn truyền trong phần body
        id: id,
        name: editedName,
        cardId: cardid,
      };

      fetchSaveData(postData); // Gọi API và truyền đối tượng trong phần body

      const newShowButtons = [...showButtons];
      newShowButtons[index] = false;
      setShowButtons(newShowButtons);

      setError1(false);
    } else {
      setError1(true);
    }
  };

  //Giải quyết sự kiến ấn tạo 1 checklist
  const createList = (event) => {
    if (name.length > 0 && name.length < 100) {
      const postData = {
        // Đối tượng bạn muốn truyền trong phần body
        cardId: cardid,
        name: name,
      };
      fetchCreateData(postData); // Gọi API và truyền đối tượng trong phần body
      setName("");
      setAdd(false);

      setError(false);
    } else {
      setError(true);
    }
  };

  const handleToggleButtons = (index) => {
    setShowButtons((prevButtons) => {
      const newShowButtons = Array(prevButtons.length).fill(false);
      newShowButtons[index] = true;
      return newShowButtons;
    });
  };

  const handleShowEdits = (index) => {
    setShowEdits((prevEdits) => {
      const newShowEdits = Array(prevEdits.length).fill(false);
      newShowEdits[index] = true;
      return newShowEdits;
    });
  };

  //hàm check dữ liệu đầu vào
  const sanitizeInput = (input) => {
    // Loại bỏ các thẻ HTML và ký tự đặc biệt không mong muốn
    const sanitizedText = input.replace(/<[^>]+>/g, "");
    return sanitizedText;
  };

  //hàm giải quyết archive 1 checklist
  const handleCheck = (id) => {
    fetchArchiveData(id);
    setChecked((prev) => {
      const isChecked = checked.includes(id);
      if (isChecked) {
        return checked.filter((item) => item !== id);
      } else {
        return [...prev];
      }
    });
  };

  //hàm giải quyết sự kiện ấn vào nút xóa tất cả
  const handleDeleteAll = () => {
    fetchDeleteData(cardid);
  };

  //hàm giải quyết sự kiện ấn vào nút xóa 1 checklist
  const handleDeleteCheckList = (id) => {
    if (!checked.includes(id)) {
      fetchDeleteCheckListData(id);
    }
  };

  const handleArchive = () => {
    setArchive(!archive);
    fetchData(cardid, !archive);
  };

  const handleCancel = (index) => {
    const newShowButtons = [...showButtons];
    newShowButtons[index] = false;
    setShowButtons(newShowButtons);

    setError1(false);

    editContentRefs.current[index].current.innerText = lists[index].name;
  };

  return (
    <Box sx={{ width: "100%", marginTop: 2, padding: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CheckBoxOutlinedIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6">To Do</Typography>
        </Box>
        <Box>
          {archive ? (
            <Button
              variant="contained"
              sx={{
                borderRadius: "5px",
                backgroundColor: "#E4E6EA",
                boxShadow: "none",
                color: "black",
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "none",
                marginRight: "16px",
                "&:hover": {
                  backgroundColor: "#D0D4DB",
                  boxShadow: "none",
                },
              }}
              onClick={handleArchive}
            >
              Show checked items ({countChecked})
            </Button>
          ) : (
            showButton && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#E4E6EA",
                  boxShadow: "none",
                  color: "black",
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  textTransform: "none",
                  marginRight: "16px",
                  "&:hover": {
                    backgroundColor: "#D0D4DB",
                    boxShadow: "none",
                  },
                }}
                onClick={handleArchive}
              >
                Hide checked items
              </Button>
            )
          )}

          <Button
            variant="contained"
            sx={{
              borderRadius: "5px",
              backgroundColor: "#E4E6EA",
              boxShadow: "none",
              color: "black",
              fontFamily:
                "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#D0D4DB",
                boxShadow: "none",
              },
            }}
            onClick={handleDeleteAll}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Box>
        <LinearProgressWithLabel
          value={progress}
          sx={{ height: "7px", borderRadius: "5px" }}
        />
      </Box>
      <Box ref={wrapperRef}>
        {lists.map((list, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              position: "relative",
              marginBottom: "8px",
              padding: "8px 0px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E4E6EA",
              },
            }}
          >
            <Box>
              <input
                type="checkbox"
                style={{ position: "absolute", top: "20px", left: "10px" }}
                checked={checked.includes(list.id)}
                onChange={() => handleCheck(list.id)}
              />
            </Box>
            <Box sx={{ width: "80%" }}>
              <Typography
                onClick={() => handleToggleButtons(index)}
                ref={editContentRefs.current[index]}
                variant="h4"
                gutterBottom
                contentEditable={true}
                style={
                  checked.includes(list.id)
                    ? {
                        wordWrap: "break-word",
                        width: "100%",
                        padding: "5px",
                        fontSize: 20,
                        margin: 0,
                        fontWeight: "bold",
                        textDecoration: "line-through",
                      }
                    : {
                        wordWrap: "break-word",
                        width: "100%",
                        padding: "5px",
                        fontSize: 20,
                        margin: 0,
                        fontWeight: "bold",
                      }
                }
                dangerouslySetInnerHTML={{ __html: list.name }}
              />
              {showButtons[index] && (
                <Box sx={{ marginTop: 1 }}>
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily:
                        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      marginRight: 2,
                    }}
                    onClick={() => handleSaveClick(index, list.id)}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleCancel(index)}
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "#E4E6EA",
                      boxShadow: "none",
                      color: "black",
                      fontFamily:
                        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#D0D4DB",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&:hover": {
                  backgroundColor: "#C5CAD2",
                },
              }}
            >
              <MoreHorizIcon onClick={() => handleShowEdits(index)} />
              {showEdits[index] && (
                <MenuList
                  ref={editRefs.current[index]}
                  sx={{
                    position: "absolute",
                    top: "35px",
                    left: "0px",
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <MenuItem onClick={() => handleDeleteCheckList(list.id)}>
                    Delete
                  </MenuItem>
                </MenuList>
              )}
            </Box>
          </Box>
        ))}
        {error1 && (
          <Box sx={{ marginTop: 2 }}>
            <Alert variant="outlined" severity="error">
              This is an error alert — check it out!
            </Alert>
          </Box>
        )}
      </Box>
      {add ? (
        <>
          <Box sx={{ marginTop: 3 }}>
            <TextField
              variant="outlined"
              style={{
                width: "100%",
              }}
              value={name}
              placeholder="Add an item"
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              sx={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                marginRight: 2,
              }}
              onClick={createList}
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setAdd(false);
                setError(false);
              }}
              sx={{
                borderRadius: "5px",
                backgroundColor: "#E4E6EA",
                boxShadow: "none",
                color: "black",
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#D0D4DB",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            onClick={() => setAdd(true)}
            sx={{
              borderRadius: "5px",
              backgroundColor: "#E4E6EA",
              boxShadow: "none",
              color: "black",
              fontFamily:
                "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#D0D4DB",
                boxShadow: "none",
              },
            }}
          >
            Add an item
          </Button>
        </Box>
      )}
      {error && (
        <Box sx={{ marginTop: 2 }}>
          <Alert variant="outlined" severity="error">
            This is an error alert — check it out!
          </Alert>
        </Box>
      )}
    </Box>
  );
}
export default CheckList;
