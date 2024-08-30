import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: indigo,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
