import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TypoText from "../../components/MUIComponent/TypoText";
import { green, pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";


export default function FeatureList() {
  const [feature, setFeature] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const navigate = useNavigate();
  const isAuth = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/user/current", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.roleId !== "ADMIN") {
          navigate("/error")
        }
      }
      else {
        navigate("/error");
      }
    } catch (err) {
      console.log("Can not get the user data");
    }
  }
  useEffect(() => { isAuth() }, []);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/feature", {
          method: "GET",
          credentials: "include"
        });
        const json = await res.json();
        setFeature(json.data);
      } catch (err) {
        console.log(err);
        setFeature([]);
      }
    }
    getList();
  }, []);
  const setActive = async (id, mess) => {
    try {
      await fetch(`http://localhost:8080/api/v1/feature/active?id=${id}&mess=${mess}`, {
        method: "PUT",
        credentials: "include",
        headers: {

        },
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <TypoText
        variant="h1"
        style={{ fontWeight: "bold", margin: "30px" }}
      >
        Application Feature
      </TypoText>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feature.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={item.active} sx={{ color: pink[800], '&.Mui-checked': { color: green[600], }, }}
                      readOnly={readOnly}
                      onInput={() => {
                        let mess = prompt("Update the description");
                        if (mess !== null) {
                          setActive(item.id, mess);
                        }
                      }} value={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}