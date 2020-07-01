import React from 'react';

import { Grid, Paper, Typography } from '@material-ui/core';

export default function Form(props) {
  return (
    <Paper elevation={3}>
      <Typography variant='h6' align='center' color='primary'>
        {props.title ? props.title : null}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={11}>
          <p>{props.description ? props.description : null}</p>
          {props.additionalData ? props.additionalData : null}
        </Grid>
      </Grid>
    </Paper>
  );
}
