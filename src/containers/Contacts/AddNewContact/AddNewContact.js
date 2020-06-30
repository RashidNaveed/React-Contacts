import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import makeStyles from '../../../components/UI/Modal/ModalStyles';
import Modals from '../../../components/UI/Modal/Modal';
import * as actionCreator from '../../../store/contactStore/index';
import { connect } from 'react-redux';
import { phoneNumberValidation } from '../../../projectData/validationRules';

const AddNewContact = (props) => {
  const { register, handleSubmit } = useForm();
  const classes = makeStyles();
  const [newContactData, setNewConatctData] = useState({
    name: '',
    phone: [{ type: 'home', number: '' }],
    email: '',
    address: '',
  });
  const changeContactHandler = (
    event,
    inputIdentifier,
    phoneIdentifier,
    type
  ) => {
    if (inputIdentifier === 'phone') {
      const phoneData = [...newContactData[inputIdentifier]];
      if (type) {
        phoneData[phoneIdentifier].type = event.target.value;
      } else {
        phoneData[phoneIdentifier].number = event.target.value;
      }

      const updatedContactData = { ...newContactData };
      updatedContactData[inputIdentifier] = phoneData;
      setNewConatctData(updatedContactData);
    } else {
      const updatedContactData = {
        ...newContactData,
      };
      updatedContactData[inputIdentifier] = event.target.value;
      setNewConatctData(updatedContactData);
    }
  };
  const deleteContactNumber = (event, inputIdentifier, index) => {
    event.preventDefault();
    const phoneData = [...newContactData[inputIdentifier]];
    let deleted = null;
    if (phoneData.length <= 1) {
      alert('You must have at least one number');
    } else {
      deleted = phoneData
        .slice(0, index)
        .concat(phoneData.slice(index + 1, phoneData.length));
      const updatedContactData = { ...newContactData };
      updatedContactData[inputIdentifier] = deleted;
      setNewConatctData(updatedContactData);
    }
  };
  const addContactNumber = (event, inputIdentifier) => {
    event.preventDefault();
    const newArray = [
      ...newContactData[inputIdentifier],
      { type: 'mobile', number: '' },
    ];
    const updatedContactData = { ...newContactData };
    updatedContactData[inputIdentifier] = newArray;
    setNewConatctData(updatedContactData);
  };
  const contactDataArray = [];
  for (let key in newContactData) {
    contactDataArray.push({
      key: key,
      value: newContactData[key],
    });
  }
  console.log('array', contactDataArray);
  const submitContactData = () => {
    props.onAddContact(newContactData);
    props.history.replace('/');
  };

  let title = 'Edit Contact';
  let additionalData = (
    <form
      onSubmit={handleSubmit(submitContactData)}
      className={classes.editContactRoot}
      noValidate
      autoComplete='off'>
      {contactDataArray.map((contact) => (
        <React.Fragment key={contact.key}>
          {contact.key === 'phone' ? (
            <React.Fragment>
              <Typography variant='h6' color='initial' justify='space-between'>
                {contact.key.charAt(0).toUpperCase() + contact.key.slice(1)}
                <Button
                  variant='outlined'
                  color='primary'
                  style={{ border: 'none' }}
                  onClick={(event) => addContactNumber(event, contact.key)}>
                  +
                </Button>
              </Typography>
              {contact.value.map((number, index) => (
                <React.Fragment key={index}>
                  <TextField
                    id='outlined-input2'
                    name={number.type}
                    label={
                      number.type.charAt(0).toUpperCase() + number.type.slice(1)
                    }
                    value={number.number}
                    variant='outlined'
                    inputRef={register(phoneNumberValidation)}
                    onChange={(event) =>
                      changeContactHandler(event, contact.key, index)
                    }
                  />
                  <Select
                    value={number.type}
                    onChange={(event) =>
                      changeContactHandler(
                        event,
                        contact.key,
                        index,
                        number.type
                      )
                    }>
                    <MenuItem value='home'>Home</MenuItem>
                    <MenuItem value='work'>Work</MenuItem>
                    <MenuItem value='mobile'>Mobile</MenuItem>
                  </Select>
                  <Button
                    style={{ border: 'none' }}
                    variant='outlined'
                    color='secondary'
                    onClick={(event) =>
                      deleteContactNumber(event, contact.key, index)
                    }>
                    -
                  </Button>
                  <br />
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <TextField
              id='outlined-input2'
              name={contact.key}
              label={contact.key.charAt(0).toUpperCase() + contact.key.slice(1)}
              value={contact.value}
              variant='outlined'
              inputRef={register({ required: true })}
              onChange={(event) => changeContactHandler(event, contact.key)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddContact: (newContactData) =>
      dispatch(actionCreator.newContact(newContactData)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewContact);
