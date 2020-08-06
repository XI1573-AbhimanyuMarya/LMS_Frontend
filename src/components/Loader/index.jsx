import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './style';

const SimpleBackdrop = (props) => {
  const { isLoading } = props;
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

SimpleBackdrop.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default SimpleBackdrop;
