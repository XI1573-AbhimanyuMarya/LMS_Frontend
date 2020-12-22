import React from 'react';
import Button from '@material-ui/core/Button';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import GreenCheck from '../../images/greencheck.svg';
import { useStyles } from './style';
import UploadFilePopup from '../DiscardPopup/draganddrop';

export const SaveButton=(props)=>{
  const {saveRateHandler}=props;
  const classes=useStyles();
  return (
      <Button className={classes.savebtn} onClick={saveRateHandler} size="small" startIcon={<img src={GreenCheck} />}>
        Save
      </Button>
  );
}

export const UploadButton=(props)=>{
  const { onViewClick,discardHandler }=props;
  const classes=useStyles();
  return (
    <>
      <Button className={classes.uploadbtn} size="small" onClick={onViewClick}>
        Upload Document
      </Button><UploadFilePopup discardHandler={discardHandler}></UploadFilePopup>
    </>
  );
}

export const WaitForApprovalButton=()=>{
  const classes=useStyles();
  return (
    <Button className={classes.waitbtn} size="small">
      Wait For Approval
    </Button>
  );
}

export const ApprovedButton=()=>{
  return (
      <DoneOutlineRoundedIcon />
  );
}