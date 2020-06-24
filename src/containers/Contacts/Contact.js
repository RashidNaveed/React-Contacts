import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/contactStore/index";
import { withRouter, Link } from "react-router-dom";
const Contact = (props) => {
  console.log("c", props.contactData);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const deleteContact = (id) => {
    props.onDeleteContact(id);
  };
  const changeContactHAndler = (event) => {
    const { name, value } = event.target;
    console.log(value);
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

  return (
    <div>
      {props.contactData.length > 0 ? (
        props.contactData.map((contact, index) => (
          <React.Fragment key={index}>
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
              <h1>{contact.name}</h1>
              <p>{contact.phone}</p>
            </Link>
            <Link
              to={{
                pathname: "/editcontact",
                state: {
                  data: contact,
                  id: index,
                  changeContactHAndler: changeContactHAndler,
                },
              }}
            >
              <button>Edit</button>
            </Link>
          </React.Fragment>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Contact)
);
