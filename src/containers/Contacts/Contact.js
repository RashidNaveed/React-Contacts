import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/contactStore/index";
import { withRouter, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { EditOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const deleteContact = (id) => {
    props.onDeleteContact(id);
  };
  return (
    <div>
      <h1>Hi from ubuntu</h1>
      {props.contactData.length > 0 ? (
        props.contactData.map((contact, index) => (
          <List className={classes.root} key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Phone:{" "}
                    </Typography>
                    {contact.phone}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Link
                  to={{
                    pathname: "/editcontact",
                    state: {
                      id: index,
                    },
                  }}
                >
                  <IconButton edge="end" aria-label="delete">
                    <EditOutlined color="primary" />
                  </IconButton>
                </Link>
                <Link
                  to={{
                    pathname: "/deletecontact",
                    state: {
                      data: contact,
                      id: index,
                      deleteContact: deleteContact,
                    },
                  }}
                >
                  <IconButton edge="end" aria-label="delete">
                    <DeleteForeverOutlinedIcon color="secondary" />
                  </IconButton>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
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
