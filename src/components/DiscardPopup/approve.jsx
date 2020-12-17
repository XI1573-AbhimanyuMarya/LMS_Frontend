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
import CheckIcon from '@material-ui/icons/Check';
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
                <DialogTitle className={classes.dailogTitle} id="responsive-dialog-title"></DialogTitle>
                {/* <Divider/> */}
                <DialogContent className={classes.content}>
                    <CheckIcon className={classes.check}></CheckIcon>
                    <DialogContentText className={classes.checkapprove} >
                    Approved
                    </DialogContentText>
                    <DialogContentText style={{textAlign:"center", fontSize:"12px"}}>
                    You have Approved the course “Course Name” for “username”
                    </DialogContentText>
                </DialogContent>
                {/* <Divider variant="middle" /> */}
                <DialogActions style={{display:"flex", justifyContent:"center"}}>
                    <Button autoFocus onClick={handleDiscard} className={classes.discardButtonapprove}>
                        Okay
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
