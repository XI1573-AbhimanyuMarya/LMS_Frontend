import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './style';
import CloseIcon from '@material-ui/icons/Close';

const DiscardPopup1 = (props) => {
  const classes = useStyles();
  const learningPathState = useSelector(state => state.learningPathState);
  const { rejectPopup } = learningPathState;
  const { discardHandler,rejectHandler } = props;
  const [ review,setReview ]=useState('');
  /**
   * function to cancel disacrd popup
   */
  const handleClose = () => {
    discardHandler(false);
  };
  /**
   * function to agree discard popup 
   */
  const handleDiscard = () => {
    rejectHandler(review);
  }

  return (
    <div style={{ width: "400px", height: "200px", borderRadius: "20px" }} >
      <Dialog
        maxWidth='xs'
        open={rejectPopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        
      >
        <div style={{display:"flex",justifyContent:"flex-end",margin:"8px 0 0 0"}}>
        <Button><CloseIcon onClick={handleClose}></CloseIcon></Button>
        </div>
        {/* <DialogTitle className={classes.dailogTitle} id="responsive-dialog-title">{"Delete Now ?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText className={classes.reason}>
            Write a reason
                    </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.text} label="Reason For Decline" variant="outlined" onChange={(e)=>setReview(e.target.value)}/>
          </form>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center", margin: "0 0 20px 0" }}>
          <Button autoFocus onClick={handleDiscard} color="primary" variant="contained" className={classes.discardButton}>
            Reject
                    </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DiscardPopup1.propTypes = {
  discardHandler: PropTypes.func.isRequired,
};

export default DiscardPopup1;
