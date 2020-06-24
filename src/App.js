import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Contact from "./containers/Contacts/Contact";
import DeleteContact from "./components/DeleteContact/DeleteContact";
import EditContact from "./components/EditContact/EditContact";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Contact} />
        <Route exact path="/deletecontact" component={DeleteContact} />
        <Route exact path="/editcontact" component={EditContact} />
      </Switch>
    </div>
  );
}

export default App;
