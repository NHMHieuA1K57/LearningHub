import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import Box from "@mui/material/Box/Box";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box sx={
      {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        minHeight: "750px",
      }
    }>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {
          error.status === 404 ?
            <img src="/img/404.jpg" alt="404 " style={{ margin: "3rem 0 1rem 0" }} />
            : <img src="/img/500.jpg" alt="404 " style={{ margin: "3rem 0 1rem 0" }} />
        }

        <p>
          <strong>{error.status}</strong>:
          <i> {error.statusText || error.message}</i>
        </p>
      </div>
    </Box>
  );
}
