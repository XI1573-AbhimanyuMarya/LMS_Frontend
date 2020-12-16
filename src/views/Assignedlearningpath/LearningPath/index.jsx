import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CreateLearningPath from './CreateLearningPath';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AssignedLearningPath = (props) => {
    const learningPathState = useSelector(state => state.learningPathState);
    const { pathModelOpen } = learningPathState;
    const { handleClose, handleClosePath } = props;
    return (
        <div>
            <Dialog fullScreen open={pathModelOpen} onClose={handleClose} TransitionComponent={transition}>
                <CssBaseline />
                <ReactNotification />
                <Container maxWidth="xl" disableGutters={true}>
                    <CreateLearningPath 
                        handleClose={handleClose} 
                        handleClosePath={handleClosePath}
                        pathStore={learningPathState}
                    />
                </Container>
            </Dialog>
        </div>
    );
}

AssignedLearningPath.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleClosePath: PropTypes.func.isRequired,
};

export default AssignedLearningPath;
