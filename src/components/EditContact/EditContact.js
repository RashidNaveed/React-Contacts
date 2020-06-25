import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/contactStore/index";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "../UI/Modal/ModalStyles";
import Modals from "../UI/Modal/Modal";

const EditContact = (props) => {
  if (!props.location.state) {
    props.history.replace("/");
  }

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

  let title = "Edit Contact";
  let additionalData = (
    <form
      onSubmit={submitContactData}
      className={makeStyles().editContactRoot}
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
      <Button variant="contained" onClick={() => props.history.replace("/")}>
        Cancel
      </Button>
    </form>
  );
  return <Modals title={title} additionalData={additionalData} />;
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
