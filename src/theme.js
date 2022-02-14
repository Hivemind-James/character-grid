import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Quicksand", "sans-serif"`,
  },
  palette: {
    primary: {
      main: "#01B4C6",
    },
    secondary: {
      main: "#97ce4c",
    },
  },
  overrides: {},
});

export default theme;
