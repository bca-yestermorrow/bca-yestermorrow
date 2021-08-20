import Landing from "./components/Landing";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from './context/AuthContext'
import { PrivateRoute } from "./components/PrivateRoute";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
const yesterTheme = createTheme({
  palette: {
    secondary: {
      main: "#67a641"
    }
  }
})
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={yesterTheme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <PrivateRoute path="/home" component={Home}></PrivateRoute>
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
