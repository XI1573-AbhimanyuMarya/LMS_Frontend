import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { useStyles } from './styles';   
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const DiscardPopup = (props) => {
    const classes = useStyles();
    const learningPathState = useSelector(state => state.learningPathState);
    const { uploadFilePopup } = learningPathState;
    const { discardHandler } = props;
   
    
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
        discardHandler(true);
    }
    return (
        <div>
            <Dialog
                maxWidth='sm'
                open={uploadFilePopup}
                onClose={handleClose}
               
                display="flex"
                className={classes.box}
            >
              
               <div className={classes.uploadContent}>
                 img
                </div>
               
                
                <DialogContent className={classes.uploadFile}>
                 img
                </DialogContent>
               
              
               
                
                
                {/* <DialogActions>
                    <Button autoFocus onClick={handleDiscard} color="primary" variant="contained" className={classes.discardButton}>
                        Discard
                    </Button>
                    <Button onClick={handleClose} color="default" autoFocus variant="outlined" className={classes.cancelButton}>
                        Cancel
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}

DiscardPopup.propTypes = {
    discardHandler: PropTypes.func.isRequired,
};

export default DiscardPopup;
