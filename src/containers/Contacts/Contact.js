import React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/contactStore/index';
import { withRouter, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { EditOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const deleteContact = (id) => {
    props.onDeleteContact(id);
  };
  return (
    <div>
      <Link to='newcontact' style={{ textDecoration: 'none' }}>
        <Button variant='outlined' color='primary' style={{ marginTop: 10 }}>
          Add New Contact
        </Button>
      </Link>
      {props.contactData.length > 0 ? (
        props.contactData.map((contact, index) => (
          <List className={classes.root} key={index}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt={contact.name} src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={
                  <React.Fragment>
                    {contact.phone.map((phn, index) => (
                      <Typography
                        key={index}
                        component='span'
                        variant='body2'
                        className={classes.inline}
                        color='textPrimary'>
                        {phn.type.charAt(0).toUpperCase() + phn.type.slice(1)}:{' '}
                        {phn.number} <br />
                      </Typography>
                    ))}
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'>
                      Email: {contact.email} <br />
                    </Typography>{' '}
                    <Typography
                      component='span'
                      variant='body2'
                      className={classes.inline}
                      color='textPrimary'>
                      Address: {contact.address} <br />
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Link
                  to={{
                    pathname: '/editcontact',
                    state: {
                      id: index,
                    },
                  }}>
                  <IconButton edge='end' aria-label='delete'>
                    <EditOutlined color='primary' />
                  </IconButton>
                </Link>
                <Link
                  to={{
                    pathname: '/deletecontact',
                    state: {
                      data: contact,
                      id: index,
                      deleteContact: deleteContact,
                    },
                  }}>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteForeverOutlinedIcon color='secondary' />
                  </IconButton>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='inset' component='li' />
          </List>
        ))
      ) : (
        <h1>No contact</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contactData: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteContact: (contactId) =>
      dispatch(actionCreator.deleteContact(contactId)),
    onEditContact: (contactId, contactData) =>
      dispatch(actionCreator.editConatct(contactId, contactData)),
  };
};

export default React.memo(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact))
);
