import Landing from "./components/Landing";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import Connect from "./components/Connect";
import EditProfile from "./components/EditProfile"
import ViewProfile from "./components/ViewProfile"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <PrivateRoute path="/home" component={Home}></PrivateRoute>
          <PrivateRoute path="/connect" component={Connect}></PrivateRoute>
          <Route path="/edit-profile" component={EditProfile}></Route>
          <Route path="/profile" component={ViewProfile}></Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
