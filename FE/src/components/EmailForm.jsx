import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Container } from '@mui/system';
import { Alert, CircularProgress } from '@mui/material';
const loadingStyle = {
  "margin": "10px auto",
  "display": "flex",
  "justify-content": "center",
}

const EmailForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      mess: message
    };

    fetch('http://localhost:8080/api/v1/user/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          setErrorMessage('Email sent successfully');
        } else {
          setErrorMessage('Failed to send email');
        }
      })
      .catch((error) => {
        setErrorMessage('Error:', error);
      }).finally(()=>setIsLoading(false))
  };

  return (
    <div className="App">
      <Header />
      <Container sx={{
        margin: "3rem auto"
      }}>
        <Typography gutterBottom variant="h3" align="center">
          Learning-Hub
        </Typography>
        <Grid>
          <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Fill up the form and our team will get back to you within 24 hours.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter first name"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter last name"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Enter phone number"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Type your message here"
                      variant="outlined"
                      fullWidth
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {!isLoading &&
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                      </Button>}
                    {isLoading && <div style={loadingStyle}><CircularProgress /></div>}
                    {errorMessage && (
                      <Alert severity="info">{errorMessage}</Alert>
                    )}
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default EmailForm;
