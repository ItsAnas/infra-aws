import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = () =>
  createMuiTheme({
    palette: {
      type: "dark",
      background: {
        paper: "rgb(21, 32, 43)",
      },
      text: {
        primary: "#fff",
        secondary: "#fff",
        disabled: "#fff",
        hint: "#fff",
      },
      primary: {
        main: "rgb(21, 32, 43)",
        contrastText: "#fff",
      },
      secondary: {
        main: "rgb(29, 161, 242)",
        contrastText: "#fff",
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 25,
        },
      },
      MuiFormLabel: {
        root: {
          "&$focused": {
            color: "#fff",
          },
        },
      },
      MuiInput: {
        underline: {
          borderBottomColor: "#fff",
          "&&:after": {
            borderBottomColor: "#fff",
          },
        },
      },
    },
  });

export default theme;
