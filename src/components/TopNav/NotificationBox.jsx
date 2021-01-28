import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { useStyles } from "./style";

import Learning_Path_Assigned from '../../images/Learning_Path_Assigned.png';
import Learning_Path_Expired from '../../images/Learning_Path_Expired.png';
import Learning_Path_Modified from '../../images/Learning_Path_Modified.png';
import Certificate_Approved from '../../images/Certificate_Approved.png';
import Learning_Path_Deleted from '../../images/Learning_Path_Deleted.png';
import Certificate_Rejected from '../../images/Certificate_Rejected.png';



const NotificationBox = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const notificationInfo = props.notificationInfo;

  let imgsrc = null;

  const takeAction = () => {
    const param = notificationInfo.notificationHeader;
    if (param == "Learning Path Assigned" || param == "Learning Path Modified"){
      history.push("/learningpath")
    }
    else if (param == "Learning Path Approval Required"){
      history.push("/approvals")
    }  
  };

  function submitBtnText(){
    const param = notificationInfo.notificationHeader
    switch(param) {
      case 'Learning Path Assigned':
        return "View Details";
      case 'Learning Path Approval Required':
        return "View Details";
      case 'Learning Path Expired':
        return "Ask For Extension";
      case 'Learning Path Modified':
        return "View Details";
      case 'Certificate Approved':
        return "Check Certificate";
      case 'Certificate Rejected':
        return "Ask Your Manager"; 
      default:
        return '';
    }

  }
  function getImgSrc() {
    const param = notificationInfo.notificationHeader
    switch(param) {
      case 'Learning Path Assigned':
        return Learning_Path_Assigned;
      case 'Learning Path Approval Required':
        return Learning_Path_Assigned;
      case 'Learning Path Expired':
        return Learning_Path_Expired;
      case 'Learning Path Modified':
        return Learning_Path_Modified;
      case 'Certificate Approved':
        return Certificate_Approved;
      case 'Learning Path Deleted':
        return Learning_Path_Deleted; 
      case 'Certificate Rejected':
        return Certificate_Rejected; 
      default:
        return '';
    }
  }
  imgsrc = getImgSrc();
 
  return (
    <tr>
      <td>
        <div className={classes.notification_icon}>
        <img src={imgsrc}/>
      </div>
      </td>
      <td className={classes.notification_info}>
        <div className={classes.notification_header}>{notificationInfo.notificationHeader}</div>
        <h1 className={classes.notification_desc}>{notificationInfo.notificationDescription}</h1>
        {notificationInfo.notificationHeader != "Learning Path Deleted" ?
        <Button className={classes.notification_view} onClick={takeAction}>
          <label className={classes.notification_btn_text}>{submitBtnText()}</label>
        </Button> : null }
      </td>
    </tr>
  );
};

export default NotificationBox;