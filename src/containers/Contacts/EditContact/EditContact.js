import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/contactStore/index';
import { Button } from '@material-ui/core';
import makeStyles from '../../../components/UI/Modal/ModalStyles';
import EditContactNumber from '../../../components/EditContact/EditContactNumber';
import EditContactData from '../../../components/EditContact/EditContactData';
import _ from 'lodash';
import Form from '../../../components/UI/Form/Form';

const EditContact = (props) => {
  if (props.location.state === undefined) {
    props.history.replace('/');
  }
  const { register, handleSubmit, errors } = useForm();
  const classes = makeStyles();
  const [contact, setContact] = useState(
    props.contactData[props.location.state.id]
  );
  const cloneObject = _.cloneDeep(contact);
  const changeContactHandler = (
    event,
    inputIdentifier,
    phoneIdentifier,
    type
  ) => {
    cloneObject[inputIdentifier] = event.target.value;
    console.log('cloneObject', cloneObject);
    if (inputIdentifier === 'phone') {
      const phoneData = [...contact[inputIdentifier]];
      if (type) {
        phoneData[phoneIdentifier].type = event.target.value;
      } else {
        phoneData[phoneIdentifier].number = event.target.value;
      }
      const updatedContactData = { ...contact };
      updatedContactData[inputIdentifier] = phoneData;
      setContact(updatedContactData);
    } else {
      const updatedContactData = {
        ...contact,
      };
      updatedContactData[inputIdentifier] = event.target.value;
      setContact(updatedContactData);
    }
  };
  const deleteContactNumber = (event, inputIdentifier, index) => {
    event.preventDefault();
    const phoneData = [...contact[inputIdentifier]];
    let deleted = null;
    if (phoneData.length <= 1) {
      alert('You must have at least one number');
    } else {
      deleted = phoneData
        .slice(0, index)
        .concat(phoneData.slice(index + 1, phoneData.length));
      const updatedContactData = { ...contact };
      updatedContactData[inputIdentifier] = deleted;
      setContact(updatedContactData);
    }
  };
  const addContactNumber = (event, inputIdentifier) => {
    event.preventDefault();
    const newArray = [
      ...contact[inputIdentifier],
      { type: 'mobile', number: '' },
    ];
    const updatedContactData = { ...contact };
    updatedContactData[inputIdentifier] = newArray;
    setContact(updatedContactData);
  };
  const contactDataArray = [];
  for (let key in contact) {
    contactDataArray.push({
      key: key,
      value: contact[key],
    });
  }
  const submitContactData = () => {
    props.onEditContact(props.location.state.id, contact);
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
            <EditContactNumber
              contact={contact}
              addContactNumber={addContactNumber}
              changeContactHandler={changeContactHandler}
              deleteContactNumber={deleteContactNumber}
              register={register}
              errors={errors}
            />
          ) : (
            <EditContactData
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
