import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/contactStore/index';
import Form from '../UI/Form/Form';

const DeleteContact = (props) => {
  if (!props.location.state) {
    props.history.replace('/');
  }
  const deleteContact = (id) => {
    props.onDeleteContact(id);
  };
  let title = 'Are you sure to delete contact?';
  let description = <span>Name: {props.location.state.data.name}</span>;
  let additionalData = (
    <React.Fragment>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          deleteContact(props.location.state.id);
          props.history.push('/');
        }}>
        Yes
      </Button>{' '}
      &nbsp; &nbsp;
      <Button variant='contained' onClick={() => props.history.push('/')}>
        No
      </Button>
    </React.Fragment>
  );

  return (
    <Form
      title={title}
      description={description}
      additionalData={additionalData}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteContact: (contactId) =>
      dispatch(actionCreator.deleteContact(contactId)),
  };
};

export default React.memo(connect(null, mapDispatchToProps)(DeleteContact));
