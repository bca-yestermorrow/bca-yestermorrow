import Landing from "./components/Landing";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import Connect from "./components/Connect";
import EditProfile from "./components/EditProfile"
import ViewProfile from "./components/ViewProfile"
import ViewOtherProfile from "./components/ViewOtherProfile";

const yesterTheme = createTheme({
  palette: {
    secondary: {
      main: "#67a641"
    },
    primary: {
      main: "#708c84"
    }
  }
})
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Switch>
        <ThemeProvider theme={yesterTheme}>
        <Route exact path="/" component={Landing}></Route>
        <PrivateRoute path="/connect" component={Connect}></PrivateRoute>
        <PrivateRoute path="/edit-profile" component={EditProfile}></PrivateRoute>
        <PrivateRoute path="/profile" component={ViewProfile}></PrivateRoute>
        <Route path="/other-profile/:userUid" render={({ match }) => ( <ViewOtherProfile userUid={match.params.userUid} />)}></Route>
        </ThemeProvider>
      </Switch>
      
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
