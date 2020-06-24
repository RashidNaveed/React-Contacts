import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/contactStore/index";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditContact = (props) => {
  if (!props.location.state) {
    props.history.replace("/");
  }
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.history.replace("/");
  };
  const [name, setName] = useState(
    props.contactData[props.location.state.id].name
  );
  const [phone, setPhone] = useState(
    props.contactData[props.location.state.id].phone
  );
  const changeContactHAndler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        return setPhone(value);
      default:
        return null;
    }
  };

  const submitContactData = (event) => {
    event.preventDefault();
    let contactData = {
      name: name,
      phone: phone,
    };
    props.onEditContact(props.location.state.id, contactData);
    props.history.replace("/");
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Edit Contact</h2>
          <form
            onSubmit={submitContactData}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-input1"
              label="Name"
              name="name"
              value={name}
              variant="outlined"
              onChange={changeContactHAndler}
            />
            <br />
            <TextField
              id="outlined-input2"
              name="phone"
              label="Phone"
              value={phone}
              variant="outlined"
              onChange={changeContactHAndler}
            />
            <br /> &nbsp;
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>{" "}
            &nbsp; &nbsp;
            <Button
              variant="contained"
              onClick={() => props.history.replace("/")}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    contactData: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditContact: (contactId, contactData) =>
      dispatch(actionCreator.editConatct(contactId, contactData)),
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(EditContact)
);
