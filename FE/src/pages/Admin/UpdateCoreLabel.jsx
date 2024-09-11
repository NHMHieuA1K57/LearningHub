import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TypoText from "../../components/MUIComponent/TypoText";
import EditableField from "../../components/EditableField";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import AddCoreLabel from "./AddCoreLabel";
import DeleteCoreLabel from "./DeleteCoreLable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function UpdateCoreLabel() {
    const [labels, setLabels] = useState([]);
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
    const renderUpdated = (e, id) => {
        const value = e.target.value;
        const updated = labels.map(label => {
            if (label.id == id) {
                switch (e.target.name) {
                    case "labelName":
                        label.name = value;
                        break;
                    case "labelColor":
                        label.color = value;
                        break;
                    default:
                        break;
                }
            }
            return label;
        });
        setLabels(updated);
    }
    const handleChange = async (e, id) => {
        try {
            renderUpdated(e, id);
            const value = e.target.value;
            let updatedLabels = labels.filter(label => { return label.id === id })[0];
            switch (e.target.name) {
                case "labelName":
                    updatedLabels.name = value;
                    break;
                case "labelColor":
                    updatedLabels.color = value;
                    break;
                default:
                    break;
            }
            if (updatedLabels.name !== "" && updatedLabels.color !== "") {
                const res = await fetch(`http://localhost:8080/api/v1/labels/updateL`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedLabels),
                })
                const json = await res.json();
            }


        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const getlabels = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/v1/labels", {
                    methods: "GET",
                    credentials: "include"
                })
                const json = await res.json();
                setLabels(json);
            } catch (err) {
                console.log(err);
            }
        }
        getlabels();
    }, [])
    return (
        <>
            <TypoText
                variant="h1"
                style={{ fontWeight: "bold", margin: "30px" }}
            >
                Core labels
            </TypoText>
            <div>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Labels</StyledTableCell>
                                    <StyledTableCell align="center">Color</StyledTableCell>
                                    <StyledTableCell align="center">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {labels.map((label) => (
                                    <StyledTableRow key={label.id}>
                                        <StyledTableCell component="th" scope="row">
                                            <EditableField key={label.id} name="labelName" content={label.name} onChange={e => handleChange(e, label.id)} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <input type="color" name="labelColor" defaultValue={label.color} onChange={e => handleChange(e, label.id)} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <DeleteCoreLabel target={label.id} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <AddCoreLabel />
                </Box>
            </div>
        </>
    )
}