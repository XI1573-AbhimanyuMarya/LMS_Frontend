import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CreateLearningPath from './CreateLearningPath';

const transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LearningPath = (props) => {
    const learningPathState = useSelector(state => state.learningPathState);
    const { pathModelOpen } = learningPathState;
    const { handleClose, handleClosePath } = props;
    return (
        <div>
            <Dialog fullScreen open={pathModelOpen} onClose={handleClose} TransitionComponent={transition}>
                <CssBaseline />
                <Container maxWidth="xl" disableGutters={true}>
                    <CreateLearningPath 
                        handleClose={handleClose} 
                        handleClosePath={handleClosePath}
                    />
                </Container>
            </Dialog>
        </div>
    );
}

export default LearningPath;
