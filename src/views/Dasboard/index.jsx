import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { cloneDeep } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';

import CardMedia from '@material-ui/core/CardMedia';

import XebiaLogo from '../../images/Logo.svg'
import AddLearningPath from '../../images/AddLearningPath.svg'

import { validateUserEmail, verifyOtp } from '../../modules/authServices';

import { useStyles } from './style';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Grid
      justify="space-between" // Add it here :)
      container 
      spacing={24}
      >
        <CardMedia
          className={classes.logo}
          image={XebiaLogo}
          title="Contemplative Reptile"

        />
      </Grid>
      
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Dashboard
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Dashboard
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Dashboard
      </Button>
      <div className={classes.paper}>
      <CardMedia
          className={classes.media}
          image={AddLearningPath}
          title="Contemplative Reptile"
        />
        <Typography component="h1" variant="h5">
          Welcome, Madhur Arya
        </Typography>
        <Typography component="h1" variant="subtitle2">
            Please assign first learning path to your team
        </Typography>
        
        
        
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            
          >
            Create Learning Path
          </Button>
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    
  );
}