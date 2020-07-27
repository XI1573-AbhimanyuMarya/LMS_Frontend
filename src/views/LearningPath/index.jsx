import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
//import { useStyles } from './style';

import CreateLearningPath from './CreateLearningPath';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    //const classes = useStyles();
    const { open, handleClose } = props;
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                {/* <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar> */}
                <List>
                    <CreateLearningPath handleClose={handleClose}/>
                </List>
            </Dialog>
        </div>
    );
}
