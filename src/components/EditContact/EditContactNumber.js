import React from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { phoneNumberValidation } from '../../projectData/validationRules';

const EditContactNumber = (props) => {
  const {
    contact,
    addContactNumber,
    changeContactHandler,
    deleteContactNumber,
    register,
    errors,
  } = props;
  return (
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
            label={number.type.charAt(0).toUpperCase() + number.type.slice(1)}
            value={number.number}
            variant='outlined'
            inputRef={register(phoneNumberValidation)}
            error={errors[number.type] ? true : false}
            helperText={
              errors[number.type] ? errors[number.type].message : null
            }
            onChange={(event) =>
              changeContactHandler(event, contact.key, index)
            }
          />
          <Select
            value={number.type}
            onChange={(event) =>
              changeContactHandler(event, contact.key, index, number.type)
            }>
            <MenuItem value='home'>Home</MenuItem>
            <MenuItem value='work'>Work</MenuItem>
            <MenuItem value='mobile'>Mobile</MenuItem>
          </Select>
          <Button
            style={{ border: 'none' }}
            variant='outlined'
            color='secondary'
            onClick={(event) => deleteContactNumber(event, contact.key, index)}>
            -
          </Button>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default EditContactNumber;
