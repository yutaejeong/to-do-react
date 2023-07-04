import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import { Todo } from "./components/Todo";
import { theme } from "./themes/global";
import Spacer from "./components/Spacer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h1">ToDo List</Typography>
          <Spacer height={32} />
          <Todo />
        </div>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
