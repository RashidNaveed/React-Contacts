import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/contactStore/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '../UI/Modal/ModalStyles';
import Modals from '../UI/Modal/Modal';

const EditContact = (props) => {
  if (!props.location.state) {
    props.history.replace('/');
  } else {
    // console.log(
    //   'props.contactData[props.location.state.id].phone',
    //   props.contactData[props.location.state.id]
    // );
  }
  const [contact, setContact] = useState(
    props.contactData[props.location.state.id]
  );
  const [name, setName] = useState(
    props.contactData[props.location.state.id].name
  );
  const [phone, setPhone] = useState(
    props.contactData[props.location.state.id].phone
  );
  const changeContactHAndler = (event, inputIdentifier) => {
    console.log('id', inputIdentifier);
    console.log('contact', contact[inputIdentifier]);
    const updatedContactData = {
      ...contact,
    };
    updatedContactData[inputIdentifier] = event.target.value;
    console.log('updatedcontactdata', updatedContactData);
    setContact(updatedContactData);
    // const { name, value } = event.target;
    // console.log('name', name, 'value', value);

    // switch (name) {
    //   case 'name':
    //     setName(value);
    //     break;
    //   case 'phone':
    //     return setPhone[name](value);
    //   default:
    //     return null;
    // }
  };
  const contactDataArray = [];
  for (let key in contact) {
    contactDataArray.push({
      key: key,
      value: contact[key],
    });
  }
  console.log('Array', contactDataArray);
  const submitContactData = (event) => {
    event.preventDefault();
    let contactData = {
      name: name,
      phone: phone,
    };
    props.onEditContact(props.location.state.id, contactData);
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
          {contact.key !== 'phone' ? (
            <TextField
              id='outlined-input2'
              name={contact.key}
              label={contact.key.charAt(0).toUpperCase() + contact.key.slice(1)}
              value={contact.value}
              variant='outlined'
              onChange={(event) => changeContactHAndler(event, contact.key)}
            />
          ) : null}
          {/* <TextField
            id='outlined-input2'
            name={contact.key}
            label={contact.key.charAt(0).toUpperCase() + contact.key.slice(1)}
            value={contact.value}
            variant='outlined'
            onChange={changeContactHAndler}
          /> */}
          <br />
        </React.Fragment>
      ))}
      {/* <TextField
        id='outlined-input1'
        label='Name'
        name='name'
        value={name}
        variant='outlined'
        onChange={changeContactHAndler}
      />
      <br />
      {phone.map((phn, index) => (
        <React.Fragment key={index}>
          <TextField
            id='outlined-input2'
            name={phn.type}
            label={phn.type}
            value={phone[index].number}
            variant='outlined'
            onChange={changeContactHAndler}
          />
          <br />
        </React.Fragment>
      ))} */}
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
