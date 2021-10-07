import Landing from "./components/Landing Page/Landing";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Connect from "./components/Connect Page/Connect";
import EditProfile from "./components/Profile Page/EditProfile";
import ViewProfile from "./components/Profile Page/ViewProfile";
import ViewOtherProfile from "./components/Profile Page/ViewOtherProfile";
import ErrorPage from "./components/ErrorPage";
const yesterTheme = createTheme({
  palette: {
    secondary: {
      main: "#67a641",
    },
    primary: {
      main: "#708c84",
    },
  },
});
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={yesterTheme}>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <PrivateRoute path="/connect" component={Connect}></PrivateRoute>
            <PrivateRoute
              path="/edit-profile"
              component={EditProfile}
            ></PrivateRoute>
            <PrivateRoute
              path="/profile"
              component={ViewProfile}
            ></PrivateRoute>
            <Route
              path="/other-profile/:userUid"
              render={({ match }) => (
                <ViewOtherProfile userUid={match.params.userUid} />
              )}
            ></Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
