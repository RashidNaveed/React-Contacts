import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddCircleOutlineOutlined } from '@material-ui/icons';

const NewContactButton = () => {
  return (
    <React.Fragment>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='flex-start'>
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Link to='newcontact' style={{ textDecoration: 'none' }}>
            <Button
              variant='outlined'
              color='primary'
              style={{ marginTop: '10%' }}>
              New Contact{' '}
              <AddCircleOutlineOutlined color='primary' fontSize='small' />
            </Button>
          </Link>
        </Grid>
        <Grid item xs={9} />
      </Grid>
    </React.Fragment>
  );
};

export default NewContactButton;
