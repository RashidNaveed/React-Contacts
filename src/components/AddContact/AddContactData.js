import React from 'react';
import { emailValidation } from '../../projectData/validationRules';
import { TextField } from '@material-ui/core';

const AddContactData = (props) => {
  const { contact, changeContactHandler, register, errors } = props;
  return (
    <TextField
      id='outlined-input2'
      name={contact.key}
      label={contact.key.charAt(0).toUpperCase() + contact.key.slice(1)}
      value={contact.value}
      variant='outlined'
      inputRef={
        contact.key === 'email'
          ? register(emailValidation)
          : register({
              required: {
                value: true,
                message: `${
                  contact.key.charAt(0).toUpperCase() + contact.key.slice(1)
                } is required`,
              },
              minLength: {
                value: 5,
                message: `${
                  contact.key.charAt(0).toUpperCase() + contact.key.slice(1)
                } should be of length 3`,
              },
            })
      }
      error={errors[contact.key] ? true : false}
      helperText={errors[contact.key] ? errors[contact.key].message : null}
      onChange={(event) => changeContactHandler(event, contact.key)}
    />
  );
};

export default AddContactData;
