import Landing from "./components/Landing";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from './context/AuthContext'
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <PrivateRoute path="/home" component={Home}></PrivateRoute>
      </Switch>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
