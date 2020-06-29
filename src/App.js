import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Contact from './containers/Contacts/Contact';
import DeleteContact from './components/DeleteContact/DeleteContact';
import EditContact from './containers/Contacts/EditContact/EditContact';
import AddNewContact from './containers/Contacts/AddNewContact/AddNewContact';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Contact} />
        <Route exact path='/deletecontact' component={DeleteContact} />
        <Route exact path='/editcontact' component={EditContact} />
        <Route exact path='/newcontact' component={AddNewContact} />
      </Switch>
    </div>
  );
}

export default App;
