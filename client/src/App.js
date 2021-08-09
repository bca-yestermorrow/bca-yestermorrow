import Landing from "./components/Landing";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
