import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
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

const DeleteContact = (props) => {
  if (!props.location.state) {
    props.history.replace("/");
  }
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
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
          <h2 id="transition-modal-title">Are you sure to delete contact?</h2>
          <p id="transition-modal-description">
            Name: {props.location.state.data.name} <br />
            Phone: {props.location.state.data.phone} <br />
          </p>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              props.location.state.deleteContact(props.location.state.id);
              props.history.push("/");
            }}
          >
            Yes
          </Button>{" "}
          &nbsp; &nbsp;
          <Button variant="contained" onClick={() => props.history.push("/")}>
            No
          </Button>
        </div>
      </Fade>
    </Modal>
    // <div>
    //   <h1>Delete Contact</h1>
    //   <button
    //     onClick={() => {
    //       props.location.state.deleteContact(props.location.state.id);
    //       props.history.push("/");
    //     }}
    //   >
    //     Delete
    //   </button>
    // </div>
  );
};

export default React.memo(DeleteContact);
