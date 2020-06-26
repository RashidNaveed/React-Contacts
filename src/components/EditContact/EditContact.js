import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/contactStore/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '../UI/Modal/ModalStyles';
import Modals from '../UI/Modal/Modal';

const EditContact = (props) => {
  if (!props.location.state) {
    props.history.replace('/');
  }
  const [contact, setContact] = useState(
    props.contactData[props.location.state.id]
  );
  const changeContactHAndler = (
    event,
    inputIdentifier,
    phoneIdentifier,
    type
  ) => {
    console.log('event', event.target);
    if (inputIdentifier === 'phone') {
      const phoneData = [...contact[inputIdentifier]];
      if (type) {
        phoneData[phoneIdentifier].type = event.target.value;
      } else {
        phoneData[phoneIdentifier].number = event.target.value;
      }

      const updatedContactData = { ...contact };
      updatedContactData[inputIdentifier] = phoneData;
      console.log('updatedContactData', updatedContactData);
      setContact(updatedContactData);
    } else {
      const updatedContactData = {
        ...contact,
      };
      updatedContactData[inputIdentifier] = event.target.value;
      console.log('updatedcontactdata', updatedContactData);
      setContact(updatedContactData);
    }
  };
  const deleteContactNumber = (event, inputIdentifier, index) => {
    event.preventDefault();
    const phoneData = [...contact[inputIdentifier]];
    console.log('delete phoneData', phoneData.length);
    let deleted = null;
    if (phoneData.length < 1) {
      alert('You must have at least one number');
    } else {
      deleted = phoneData
        .slice(0, index)
        .concat(phoneData.slice(index + 1, phoneData.length));
      console.log('phoneData', deleted);
    }
    const updatedContactData = { ...contact };
    updatedContactData[inputIdentifier] = deleted;
    console.log('new data', updatedContactData);
    setContact(updatedContactData);
  };
  const contactDataArray = [];
  for (let key in contact) {
    contactDataArray.push({
      key: key,
      value: contact[key],
    });
  }
  const submitContactData = (event) => {
    event.preventDefault();
    props.onEditContact(props.location.state.id, contact);
    props.history.replace('/');
  };

  let title = 'Edit Contact';
  let additionalData = (
    <form
      onSubmit={submitContactData}
      className={makeStyles().editContactRoot}
      noValidate
      autoComplete='off'>
      {contactDataArray.map((contact) => (
        <React.Fragment key={contact.key}>
          {contact.key === 'phone' ? (
            contact.value.map((number, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={(event) =>
                    deleteContactNumber(event, contact.key, index)
                  }>
                  -
                </button>
                <TextField
                  id='outlined-input2'
                  name={number.type}
                  label={
                    number.type.charAt(0).toUpperCase() + number.type.slice(1)
                  }
                  value={number.number}
                  variant='outlined'
                  onChange={(event) =>
                    changeContactHAndler(event, contact.key, index)
                  }
                />
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={number.type}
                  onChange={(event) =>
                    changeContactHAndler(event, contact.key, index, number.type)
                  }>
                  <MenuItem value='home'>Home</MenuItem>
                  <MenuItem value='work'>Work</MenuItem>
                  <MenuItem value='mobile'>Mobile</MenuItem>
                </Select>
                <br />
              </React.Fragment>
            ))
          ) : (
            <TextField
              id='outlined-input2'
              name={contact.key}
              label={contact.key.charAt(0).toUpperCase() + contact.key.slice(1)}
              value={contact.value}
              variant='outlined'
              onChange={(event) => changeContactHAndler(event, contact.key)}
            />
          )}
          <br />
        </React.Fragment>
      ))}
      <br /> &nbsp;
      <Button variant='contained' color='primary' type='submit'>
        Save
      </Button>{' '}
      &nbsp; &nbsp;
      <Button variant='contained' onClick={() => props.history.replace('/')}>
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
