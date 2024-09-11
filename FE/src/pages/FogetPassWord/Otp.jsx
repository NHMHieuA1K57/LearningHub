import Box from "@mui/material/Box";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import CountDown from "./CountDown";
import { useLocation, useNavigate,Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import TypoText from "../../components/MUIComponent/TypoText";

const Otp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState("");
    const [back, setBack] = useState(false);
    const [time, setTime] = useState('');

    const handleChange = (otp1) => {
        setOtp(otp1);
    }

    const handleOnClear = () => {
        setOtp('');
    }

    const handleConfirm = () => {
        if (parseInt(time) > 0) {
            if (data.otp === otp && data.active) {
                navigate(`/resetpass`, { state: data.email });
            } else {
                setOtp('');
                setError("OTP not correct.Please try again.");
            }
        } else {
            setError("The verification code has expired.");
            setBack(true);
        }
    }

    const handleTime = (t) => {
        setTime(t)
    }


    return (
        <Box sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "50%",
            left: "50%",
            position: "fixed",
            transform: "translate(-50%, -50%)",
            width: "50%",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            alignItems: "center",
        }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Enter verification code
            </Typography>
            <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                    <input
                        {...props}
                        style={{
                            width: "4em",
                            textAlign: "center",
                        }}
                    />
                )}
            // inputStyle={"input-customize"}
            />
            <CountDown handleTime={handleTime} />

            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained"
                    sx={{ marginRight: '10px' }}
                    onClick={handleOnClear}
                >Clear</Button>
                <Button onClick={handleConfirm} variant="contained"

                >Confirm</Button>
            </Box>
            {error && <Alert severity="warning"
                sx={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px" }}>
                {error}</Alert>}
            {back&&<TypoText variant="h5" style={{ marginTop: '10px' }}>
                <Link to={{
                    pathname: '/forgotpassword'
                }}>Click here</Link> to attempt password reset one more time.
            </TypoText>}
        </Box>
    );
}
export default Otp;