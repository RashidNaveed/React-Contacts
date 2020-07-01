import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import makeStyles from '../../components/UI/Modal/ModalStyles';
import { List, Divider, Grid } from '@material-ui/core';
import NewContactButton from '../../components/Contact/NewContactButton';
import ContactList from '../../components/Contact/ContactList';
import DeleteContact from '../../components/DeleteContact/DeleteContact';
import EditContact from './EditContact/EditContact';
import AddNewContact from './AddNewContact/AddNewContact';

const Contact = (props) => {
  const classes = makeStyles();
  let contacts = (
    <Grid container spacing={3}>
      <NewContactButton />
      <Grid item xs={4}>
        {props.contactData.length > 0 ? (
          props.contactData.map((contact, index) => (
            <List className={classes.contactList} key={index}>
              <ContactList contact={contact} index={index} />
              <Divider variant='inset' component='li' />
            </List>
          ))
        ) : (
          <h1>No contact</h1>
        )}
      </Grid>
      <Divider orientation='vertical' flexItem />
      <Grid item xs={5}>
        <Switch>
          <Route exact path='/deletecontact' component={DeleteContact} />
          <Route exact path='/editcontact' component={EditContact} />
          <Route exact path='/newcontact' component={AddNewContact} />
        </Switch>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
  return <div>{contacts}</div>;
};

const mapStateToProps = (state) => {
  return {
    contactData: state.contacts,
  };
};

export default React.memo(withRouter(connect(mapStateToProps, null)(Contact)));
