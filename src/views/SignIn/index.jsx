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

import CardMedia from '@material-ui/core/CardMedia';

import XebiaLogo from '../../images/Logo.svg'
import Image from '../../images/Image.png'

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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    isLoading: false,
    username: '',
    password: '',
    isValidEmail: true,
    isValidOtp: true,
    message: '',
    sendOtp: false
  })

  const onChangeHandler = ( e ) => {
    const {name, value} = e.target;
    setState(prevState => ({ ...prevState, [name]: value, isValidEmail: true, isValidOtp: true  } ));
  }

  const redirectDashboardPage = () => {
    const _state = cloneDeep( state );
    let path = `/dashboard`; 
    history.push(path);
  }

  const onFormSubmit = (e) => {
      e.preventDefault();
      const {username, password, sendOtp, isValidEmail, isValidOtp} = state;
      setState(prevState => ({ ...prevState, isLoading: true, isValidEmail: username, isValidOtp: password  } ));
      if(username && sendOtp === false) {
          validateUserEmail(state, setState);
      } else if(password && sendOtp === true) {
          verifyOtp(state, setState, redirectDashboardPage);
      } else {
          setState(prevState => ({ ...prevState, isLoading: false} ));
      }
  }

  const { 
    username, 
    password, 
    isValidOtp, 
    isLoading, 
    sendOtp, 
    isValidEmail } = state;
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
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Learning Management System
        </Typography>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Contemplative Reptile"
        />
        
        <form className={classes.form} noValidate>
          {
            !sendOtp ?
            <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={onChangeHandler}
              value={username}
            />
            { isValidEmail ? null : <div className={classes.error}>Please Enter Valid Email.</div> }           
            </>
            :
            <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}
              value={password}
            />
            { isValidOtp ? null : <div className={classes.error}>Please Enter Valid OTP.</div> }
            </>
           
          }
        
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={onFormSubmit}
            disabled={isLoading}
          >
            { isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    
  );
}