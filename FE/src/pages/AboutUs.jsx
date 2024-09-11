import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const AuthorCard = (props) => {
  return (
    <>
      <Card
        sx={{
          margin: "0 1rem",
          textAlign: "center",
        }}
      >
        <>
          <CardContent>
            <div
              style={{
                display: "flex",
                "justify-content": "center",
                marginBottom: "1rem",
              }}
            >
              <Avatar
                alt="author image"
                src={props.img}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </div>
            <Typography
              variant="h5"
              sx={{ marginBottom: "1rem", fontFamily: "cursive" }}
            >
              {props.name}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "cursive" }}>
              {props.desc}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              href={props.link}
              sx={{ fontFamily: "cursive" }}
            >
              More about me
            </Button>
          </CardActions>
        </>
      </Card>
    </>
  );
};

export default function AboutUs() {
  return (
    <>
      <Header />

      <div
        style={{
          margin: "5vh 0",
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{ marginBottom: "1rem", fontFamily: "cursive" }}
          >
            We are a small group with a big dream
          </Typography>
          <Typography
            variant="body"
            sx={{ marginBottom: "1rem", fontFamily: "cursive" }}
          >
            We are SE1722NJ_Group2. This is a temporally group for a SWP course
            (Application Software development). In this project, we are trying
            to bring some features that support the learner's self-learning and
            self-task management effectively. By researching some fantastic
            features from some successful companies, We hope to mimic their
            features in the simplest way possible for practice purposes. We are
            hoping to make this application more fun and helpful for practical
            users!
          </Typography>
          <Typography
            variant="h3"
            sx={{ margin: "2rem 0", fontFamily: "cursive" }}
          >
            Members
          </Typography>
        </Container>
        <Container>
          <Grid container spacing={1}>
            <Grid item sx={2} md={6}>
              <AuthorCard
                name={"Phan Dang Truong"}
                img={"/img/PDT.jpg"}
                desc={
                  "Dreaming to become an expert full-stack web developer in the future. I believe that practical experience is as crucial as theory. I hoped of learning from expert developers and being motivated by an inspiring working environment to not only enforce my skills but bring value to the company as well."
                }
                link={"https://github.com/HC2102"}
              />
            </Grid>
            <Grid item sx={2} md={6}>
              <AuthorCard
                name={"Phan Thanh An"}
                img={"/img/APT.jpg"}
                desc={
                  "I have always been passionate with technology since I was at high school. As a girl in software engineering, I want to spread my love and confidence to all the girls that are and will work in this area. I'm a super funny and energetic, feel free to find me if you wanna talk or need someone to listen."
                }
                link={"https://github.com/AnPhan04"}
              />
            </Grid>
            <Grid item sx={2} md={6}>
              <AuthorCard
                name={"Tran Quang Huy"}
                img={"/img/HTQ.jpg"}
                desc={
                  "Dreaming to become an expert full-stack web developer in the future. I believe that practical experience is as crucial as theory. I hoped of learning from expert developers and being motivated by an inspiring working environment to not only enforce my skills but bring value to the company as well."
                }
                link={"https://github.com/HC2102"}
              />
            </Grid>
            <Grid item sx={2} md={6}>
              <AuthorCard
                name={"Nguyen Hoang Minh Hieu"}
                img={"/img/HNHM.jpg"}
                desc={
                  "Allow me  a shy but determined individual who embraces my reserved nature. Despite facing obstacles, I use my shyness as motivation to grow and step out of my comfort zone. With self-acceptance and patience, I celebrate every small victory on my journey of personal growth. Though quiet, I value collaboration and cherish my unique perspective."
                }
                link={"https://github.com/HC2102"}
              />
            </Grid>
            <Grid item sx={2} md={12}>
              <AuthorCard
                name={"Chu Thanh Vinh"}
                img={"/img/VCT.jpg"}
                desc={
                  "Dreaming to become an expert full-stack web developer in the future. I believe that practical experience is as crucial as theory. I hoped of learning from expert developers and being motivated by an inspiring working environment to not only enforce my skills but bring value to the company as well."
                }
                link={"https://github.com/HC2102"}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}
