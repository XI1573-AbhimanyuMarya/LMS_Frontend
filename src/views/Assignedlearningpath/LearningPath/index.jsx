import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CreateLearningPath from './CreateLearningPath';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import LearningPathDesc from './LearningPathDesc';
import Actions from '../../../store/actions';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignedLearningPath = (props) => {

  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { pathModelOpen, selectedLp } = learningPathState;
  const { handleClose, handleClosePath } = props;
  useEffect(() => {
    dispatch(Actions.learningPathActions.selectLearningPath({}));
  }, []);
  return (Object.keys(selectedLp).length !== 0 && selectedLp.constructor === Object ? <LearningPathDesc selectedLp={selectedLp} /> : <CreateLearningPath />);
}

AssignedLearningPath.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleClosePath: PropTypes.func.isRequired,
};

export default AssignedLearningPath;
