import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import CreateLearningPath from './CreateLearningPath';
//import { useStyles } from './style';

const transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LearningPath = (props) => {
    //const classes = useStyles();
    const { openPathModel, handleClose } = props;
    return (
        <div>
            <Dialog fullScreen open={openPathModel} onClose={handleClose} TransitionComponent={transition}>
                {/* <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar> */}
                <List>
                    <CreateLearningPath handleClose={handleClose} />
                </List>
            </Dialog>
        </div>
    );
}

export default LearningPath;
