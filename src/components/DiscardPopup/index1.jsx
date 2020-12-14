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
import { useStyles } from './style';   

const DiscardPopup1 = (props) => {
    const classes = useStyles();
    const learningPathState = useSelector(state => state.learningPathState);
    const { discardModelOpen } = learningPathState;
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
                maxWidth='xs'
                open={discardModelOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle className={classes.dailogTitle} id="responsive-dialog-title">{"Delete Now ?"}</DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText>
                    Are You sure you want to delete it?
                    </DialogContentText>
                </DialogContent>
                <Divider variant="middle" />
                <DialogActions>
                    <Button autoFocus onClick={handleDiscard} color="primary" variant="contained" className={classes.discardButton}>
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="default" autoFocus variant="outlined" className={classes.cancelButton}>
                        Cancel
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
