import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import CardMedia from '@material-ui/core/CardMedia';
import Copyright from '../../components/Copyright';
import XebiaLogo from '../../images/Logo.svg';
import Image from '../../images/Image.png';
import { useStyles } from './style';
import Actions from '../../store/actions';

const SignIn = () => {
	const classes = useStyles();
	const history = useHistory();
  const loginState = useSelector(state => state.loginState);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(Actions.loginActions.getUserDetails(name, value));
  }

  const redirectDashboardPage = () => {
    let path = `/dashboard`;
    history.push(path);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { username, password, sendOtp } = loginState;
    if (username && sendOtp === false) {
      dispatch(Actions.loginActions.validateUserEmail(username));
    } else if (password && sendOtp === true) {
      dispatch(Actions.loginActions.velidateOtp(username, password));
    }
  }

  useEffect(() => {
    const { login, message } = loginState;
    if (login !== null && message === "Otp verified") {
      localStorage.setItem("user", JSON.stringify(login));
      redirectDashboardPage();
    }
  }, [loginState.login])

  const { username, password, isValidOtp, isLoading, sendOtp, isValidEmail } = loginState;

  return (
    <div>
      <Grid
        justify="space-between"
        container
      >
        <CardMedia
          className={classes.logo}
          image={XebiaLogo}
          title="Learning Module"

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
            title="Learning Module"
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
                  {isValidEmail ? null : <div className={classes.error}>Please Enter Valid Email.</div>}
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
                  {isValidOtp ? null : <div className={classes.error}>Please Enter Valid OTP.</div>}
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
              {isLoading ? 'Loading...' : 'Login'}
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

export default SignIn;