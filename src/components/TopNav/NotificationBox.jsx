import React from "react";
import Button from '@material-ui/core/Button';

import { useStyles } from "./style";

import Learning_Path_Assigned from '../../images/Learning_Path_Assigned.png';
import Learning_Path_Expired from '../../images/Learning_Path_Expired.png';
import Learning_Path_Modified from '../../images/Learning_Path_Modified.png';
import Certificate_Approved from '../../images/Certificate_Approved.png';


const NotificationBox = (props) => {
  const classes = useStyles();
  const notificationInfo = props.notificationInfo;

  let imgsrc = null;
  function getImgSrc(param) {
    switch(param) {
      case 'Learning Path Assigned':
        return Learning_Path_Assigned;
      case 'Learning Path Expired':
        return Learning_Path_Expired;
      case 'Learning Path Modified':
        return Learning_Path_Modified;
      case 'Certificate Approved':
        return Certificate_Approved;
      default:
        return 'foo';
    }
  }
  imgsrc = getImgSrc(notificationInfo.notificationHeader);
 
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
        <Button className={classes.notification_view}>
          <label className={classes.notification_btn_text}>View Details</label>
        </Button>
      </td>
    </tr>
  );
};

export default NotificationBox;
