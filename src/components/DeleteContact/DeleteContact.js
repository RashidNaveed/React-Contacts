import React from "react";
import Button from "@material-ui/core/Button";
import Modals from "../UI/Modal/Modal";

const DeleteContact = (props) => {
  if (!props.location.state) {
    props.history.replace("/");
  }
  let title = "Are you sure to delete contact?";
  let description = (
    <span>
      Name: {props.location.state.data.name} <br />
      Phone: {props.location.state.data.phone} <br />
    </span>
  );
  let additionalData = (
    <React.Fragment>
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
    </React.Fragment>
  );

  return (
    <Modals
      title={title}
      description={description}
      additionalData={additionalData}
    />
  );
};

export default React.memo(DeleteContact);
