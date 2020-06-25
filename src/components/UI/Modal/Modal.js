import React from "react";
import makeStyle from "./ModalStyles";
import { Redirect } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Modals = (props) => {
  const [open, setOpen] = React.useState(true);
  const [redirect, setRedirect] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setRedirect(true);
  };
  const redirectTo = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      {redirectTo()}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={makeStyle().modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={makeStyle().paper}>
            <h2 id="transition-modal-title">
              {props.title ? props.title : null}
            </h2>
            <p id="transition-modal-description">
              {props.description ? props.description : null}
            </p>
            {props.additionalData ? props.additionalData : null}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Modals;
