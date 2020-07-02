import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { EditOutlined, DeleteForeverOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import makeStyles from '../UI/Modal/ModalStyles';

const ContactList = (props) => {
  const classes = makeStyles();
  const { contact, index } = props;
  return (
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
            },
          }}>
          <IconButton edge='end' aria-label='delete'>
            <DeleteForeverOutlined color='secondary' />
          </IconButton>
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ContactList;
