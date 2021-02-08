import React from 'react';
import Button from '@material-ui/core/Button';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import { useHistory } from "react-router-dom";
import GreenCheck from '../../images/greencheck.svg';
import ArrowBackIos from '../../images/ArrowBackIos.svg';
import { useStyles } from './style';
import UploadFilePopup from '../DiscardPopup/draganddrop';
import ArrowForwardIos from '../../images/ArrowForwardIos.svg';
import { useDispatch } from "react-redux";
import Actions from "../../store/actions";


export const SaveButton = (props) => {
  const { saveRateHandler } = props;
  const classes = useStyles();

  return (
    <Button className={classes.savebtn} onClick={saveRateHandler} size="small" startIcon={<img src={GreenCheck} />}>
      Save
    </Button>
  );
}

export const UploadButton = (props) => {

  const { onViewClick, discardHandler, changeImgHandler, uploadDocs, courseName } = props;

  const classes = useStyles();
  return (
    <>
      <Button className={classes.uploadbtn} size="small" onClick={onViewClick}>
        Upload Document
      </Button><UploadFilePopup discardHandler={discardHandler} changeImgHandler={changeImgHandler} uploadDocs={uploadDocs}></UploadFilePopup>
    </>
  );
}

export const WaitForApprovalButton = () => {
  const classes = useStyles();
  return (
    <>
      <Button className={classes.completed}>{`100%`}</Button>
      <Button className={classes.waitbtn}>{"Waiting for approval"}</Button>
    </>
  );
}

export const ApprovedButton = () => {
  return (
    <DoneOutlineRoundedIcon />
  );
}

export const BackButton = (props) => {
  const { backBtnHandler } = props;
  const classes = useStyles();
  return (
    <Button size="small" onClick={backBtnHandler} className={classes.bckbtn} startIcon={<img src={ArrowBackIos} />}>
      Back
    </Button>
  );
}

export const ViewButton = (props) => {
  const { onButtonClick } = props;
  const classes = useStyles();
  return (
    <Button variant="outlined" onClick={onButtonClick} size="small" className={classes.viewbtn}>
      {"View"}
    </Button>
  );
}

export const LearningRateButton = (props) => {
  const { percentCompleted } = props;
  const classes = useStyles();
  return (
    <Button variant="outlined" size="small" className={classes.avglearningrate}>
      {`${percentCompleted}%`}
    </Button>
  );
}

export const CourseAssignButton = (props) => {
  const { onButtonClick, assignLp, count } = props;
  const classes = useStyles();

  return (
    <Button size="small" variant="outlined" className={classes.cardfooterbtn} onClick={onButtonClick}>
      {count}
      {assignLp && <img src={ArrowForwardIos} className={classes.arrowfwbtn} />}
    </Button>
  );
}

export const ApproveButton = (props) => {
  const { onViewClickApprove } = props;
  const classes = useStyles();
  return (
    <Button className={classes.approve} onClick={onViewClickApprove}>Approve</Button>
  );
}

export const RejectButton = (props) => {
  const { onViewClick } = props;
  const classes = useStyles();
  return (
    <Button className={classes.reject} onClick={onViewClick}>Reject</Button>
  );
}

export const CompletedButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.completed}>{`100%`}<DoneRoundedIcon className={classes.doneroundedicon} /></Button>
  );
}

export const ViewDetails = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onViewDetailsClick = () => {
    dispatch(Actions.learningPathActions.openDetails(true, props.learningPathId));
    dispatch(Actions.learningPathActions.getAdminDetails(props.learningPathId));
  }
  return (
    <Button className={classes.viewDtl} onClick={onViewDetailsClick}>View Details</Button>
  );
}