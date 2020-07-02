import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import makeStyles from '../../../components/UI/Modal/ModalStyles';
import * as actionCreator from '../../../store/contactStore/index';
import { connect } from 'react-redux';
import AddContactNumbers from '../../../components/AddContact/AddContactNumbers';
import AddContactData from '../../../components/AddContact/AddContactData';
import Form from '../../../components/UI/Form/Form';
import hookReducer from '../utilities/hookReducer';
import * as hookActionCreator from '../utilities/actionCreators';

const AddNewContactReducer = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = makeStyles();
  let state = {
    name: '',
    phone: [{ type: 'home', number: '' }],
    email: '',
    address: '',
  };
  const [newContactData, dispatch] = useReducer(hookReducer, state);

  const changeContactData = (event, inputIdentifier) => {
    dispatch(
      hookActionCreator.changeData({
        changedValue: event.target.value,
        key: inputIdentifier,
      })
    );
  };
  const changeContactNumber = (event, inputIdentifier, index, type) => {
    dispatch(
      hookActionCreator.changeNumber({
        changedValue: event.target.value,
        key: inputIdentifier,
        index: index,
        type: type,
      })
    );
  };
  const addContactNumber = (event, inputIdentifier) => {
    event.preventDefault();
    dispatch(
      hookActionCreator.addNumber({
        key: inputIdentifier,
      })
    );
  };
  const deleteContactNumber = (event, inputIdentifier, index) => {
    event.preventDefault();
    dispatch(
      hookActionCreator.removeNumber({
        key: inputIdentifier,
        index: index,
      })
    );
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
              changeContactNumber={changeContactNumber}
              deleteContactNumber={deleteContactNumber}
              register={register}
              errors={errors}
            />
          ) : (
            <AddContactData
              contact={contact}
              changeContactData={changeContactData}
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
export default connect(null, mapDispatchToProps)(AddNewContactReducer);
