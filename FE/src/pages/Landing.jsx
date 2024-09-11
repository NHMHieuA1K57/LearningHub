import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import styled from "@emotion/styled";
import { Avatar, Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";

const H1 = styled.h1`
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 20%;
  font-family: cursive;
  letter-spacing: 20px;
  text-align: center;
  transition: 0.3s all;
  
`

const FeatureCard = (props) => {
  return (
    <>
      <Card
        sx={
          {
            margin: "0 1rem",
            textAlign: "center",
          }
        }>
        <>
          <CardContent>
            <div
              style={{
                "display": "flex",
                "justify-content": "center",
                marginBottom: "1rem"
              }}>
              <Avatar alt="author image" src={props.img}
                sx={
                  {
                    width: 100, height: 100
                  }
                }
              />
            </div>
            <Typography variant="h5">{props.name}</Typography>
            <Typography variant="body2">
              {props.desc}
            </Typography>
          </CardContent>
          <CardActions sx={
            {
              justifyContent: "center"

            }
          }>
            <Button size="small" href={"/signup"}>Interested? join us now!</Button>
          </CardActions>
        </>

      </Card>
    </>
  );
}

const Landing = () => {
  return (
    <div>
      <Header />
      <Container sx={{
        margin: "2rem auto",
        alignContent: "center"
      }}>
        <Container >
          <H1>Welcome to Learning Hub❤️</H1>
          <div className="dashboard-container" style={{ justifyContent: "center", width: "100%", }}>
            <img src="/img/landing.jpg" alt="landing " style={{ margin: " 0" }} />
          </div>
        </Container>
        <Container
          sx={{
            margin: "8vh 0"
          }}
        >
          <Typography variant="h3" align="center" sx={{
            fontFamily: "cursive",
            letterSpacing: "20px"
          }}>What we can do</Typography>
          <Container sx={
            { marginTop: "2vh" }
          }>
            <Grid container spacing={1}>
              <Grid item sx={2} md={6} >
                <FeatureCard
                  name={"Flashcard"}
                  img={"/img/flash-card.png"}
                  desc={"Remember things effectively with cards!"}
                />
              </Grid>
              <Grid item sx={2} md={6} >
                <FeatureCard
                  name={"Task manager"}
                  img={"/img/tasks.png"}
                  desc={"Tracking progress of your own project with board and cards!"}
                />
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Container>
      <Footer />
    </div>
  );
};

export default Landing;
