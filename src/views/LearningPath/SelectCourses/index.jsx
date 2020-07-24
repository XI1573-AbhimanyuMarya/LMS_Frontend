import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import Carosals from './Carosals';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  catalogTitle: {
    marginLeft: 40,
    margin: 20
  },
  courseField: {
    width: '50%',
    marginLeft: 250,
    background: '#FFFFFF',
    margin: theme.spacing(2),
  },
  searchField: {
    width: '70%',
    marginLeft: 150,
    background: '#FFFFFF',
    margin: theme.spacing(2),
  }
}));

export default function AddressForm() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid> 
      <TextField id="standard-search" label="Search Course" type="search" variant="outlined" className={classes.searchField}/>
      <Box bgcolor="#F1F3F7" p={4} >
      
      <TextField id="standard-search" label="Backend Course" type="search" variant="outlined" className={classes.courseField}/>
      <Divider variant="middle" />  
      <Typography variant="h6" className={classes.catalogTitle}>
        Course Catalog
      </Typography>
        <Carosals />
      
      </Box>
      </Grid>
    </React.Fragment>
  );
}