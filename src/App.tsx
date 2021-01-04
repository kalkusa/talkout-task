import React from "react";
import "./App.css";
import { CharacterList } from "./pages/CharacterList/CharacterList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CharacterDetails } from "./pages/CharacterDetails/CharacterDetails";

const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/character/:id" exact component={CharacterDetails} />
          <Route path="/" component={CharacterList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
