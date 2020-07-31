import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    const learningPathState = useSelector(state => state.learningPathState);
    const { pathModelOpen } = learningPathState;
    const { handleClose, handleClosePath } = props;
    return (
        <div>
            <Dialog fullScreen open={pathModelOpen} onClose={handleClose} TransitionComponent={transition}>
                {/* <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar> */}
                <List>
                    <CreateLearningPath 
                        handleClose={handleClose} 
                        handleClosePath={handleClosePath}
                    />
                </List>
            </Dialog>
        </div>
    );
}

export default LearningPath;
