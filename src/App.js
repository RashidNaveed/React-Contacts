import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Contact from './containers/Contacts/Contact';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' component={Contact} />
        <Route
          render={() => (
            <div>
              <h1>Page Not Found</h1>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
