import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useStyles } from './style';

const SimpleBackdrop = (props) => {
  const { isLoading } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    //setOpen(false);
  };
  const handleToggle = () => {
    //setOpen(!open);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Backdrop className={classes.backdrop} open={isLoading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SimpleBackdrop;
