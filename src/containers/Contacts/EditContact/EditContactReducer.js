import React, { useReducer } from 'react';
import hookReducer from '../utilities/hookReducer';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/contactStore/index';
import * as hookActionCreator from '../utilities/actionCreators';
import { Button } from '@material-ui/core';
import makeStyles from '../../../components/UI/Modal/ModalStyles';
import EditContactNumber from '../../../components/EditContact/EditContactNumber';
import EditContactData from '../../../components/EditContact/EditContactData';
import Form from '../../../components/UI/Form/Form';

const EditContactReducer = (props) => {
  if (props.location.state === undefined) {
    props.history.replace('/');
  }
  const { register, handleSubmit, errors } = useForm();
  const classes = makeStyles();
  let index = props.location.state.id;
  let state = props.contactData[index];
  const [contactDataReducer, dispatch] = useReducer(hookReducer, state);

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
  const submitContactData = () => {
    props.onEditContact(index, contactDataReducer);
    props.history.replace('/');
  };
  const contactDataArray = [];
  for (let key in contactDataReducer) {
    contactDataArray.push({
      key: key,
      value: contactDataReducer[key],
    });
  }
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
              changeContactNumber={changeContactNumber}
              deleteContactNumber={deleteContactNumber}
              register={register}
              errors={errors}
            />
          ) : (
            <EditContactData
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
  connect(mapStateToProps, mapDispatchToProps)(EditContactReducer)
);
