import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import makeStyles from '../../../components/UI/Modal/ModalStyles';
import * as actionCreator from '../../../store/contactStore/index';
import { connect } from 'react-redux';
import AddContactNumbers from '../../../components/AddContact/AddContactNumbers';
import AddContactData from '../../../components/AddContact/AddContactData';
import Form from '../../../components/UI/Form/Form';

const AddNewContact = (props) => {
  const { register, handleSubmit, errors } = useForm();
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
  const submitContactData = () => {
    props.onAddContact(newContactData);
    props.history.replace('/');
  };

  let title = 'Add New Contact';
  let additionalData = (
    <form
      onSubmit={handleSubmit(submitContactData)}
      className={classes.editContactRoot}>
      {contactDataArray.map((contact) => (
        <React.Fragment key={contact.key}>
          {contact.key === 'phone' ? (
            <AddContactNumbers
              contact={contact}
              addContactNumber={addContactNumber}
              changeContactHandler={changeContactHandler}
              deleteContactNumber={deleteContactNumber}
              register={register}
              errors={errors}
            />
          ) : (
            <AddContactData
              contact={contact}
              changeContactHandler={changeContactHandler}
              register={register}
              errors={errors}
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
  return <Form title={title} additionalData={additionalData} />;
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddContact: (newContactData) =>
      dispatch(actionCreator.newContact(newContactData)),
  };
};
export default connect(null, mapDispatchToProps)(AddNewContact);
