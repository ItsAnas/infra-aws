import Home from "./views/Home";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./utils/theme";

const App = () => (
  <ThemeProvider theme={theme()}>
    <Home />
  </ThemeProvider>
);

export default App;
