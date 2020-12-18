import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DiscardPopup from "../../../components/DiscardPopup/index1";
import Actions from '../../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Approve from '../../../components/DiscardPopup/approve'
import Reject from '../../../components/DiscardPopup/Reject'

import { useStyles } from "./style";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body2: {
        fontSize: "12px",
      },
    },
    MuiCardHeader: {
      subheader: {
        fontSize: "11px",
      },
    },
    MuiList: {
      root: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiListItemText: {
      secondary: {
        fontSize: "10px",
        color: "#282828",
        marginRight: "10px",
      },
    },
  },
});

export default function EmployeeCardApproval(props) {
  const data = props.data;
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { pfApproval } = learningPathState;
  
  const loginState = useSelector(
    (state) => state.loginState
  );
console.log(loginState, "pfA")
  const onViewClick = () => {
    console.log("view clicked")
    dispatch(Actions.learningPathActions.RejectModelOpen(true));
    dispatch(Actions.learningPathActions.getApprovalRejects(data.learningPathEmployeesId,"REJECTED"));
  }

  const discardHandler = () => {
    dispatch(Actions.learningPathActions.RejectModelOpen(false));
  }

  const onViewClickApprove = () => {
    console.log("view clicked")
    dispatch(Actions.learningPathActions.ApproveModelOpen(true));
      dispatch(Actions.learningPathActions.getApprovalRejects(data.learningPathEmployeesId,"APPROVED"));
  }

  const discardHandlerApprove = () => {
    dispatch(Actions.learningPathActions.ApproveModelOpen(false));
    
  }

  console.log(data, 'data')
  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CardHeader style={{ minWidth: "250px", maxWidth: "250px" }}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            title={`${data.employee.fullName} (${data.employee.empID})`}
            subheader={data.employee.designation}
          />
        </ThemeProvider>
        <div style={{ minWidth: "50px", maxWidth: "50px" }}>
          {/* {data.learningPath.map((data, index) => ( */}
          <CardContent className={classes.learningPath} >
            <ThemeProvider theme={theme}>
            <Typography aria-label="share" className={classes.listData} style={{minWidth:"50px", maxWidth:"50px"}}>
              <span className={classes.courseName}>{` ${data.learningPath.name}`}
                   </span>
              </Typography>
            </ThemeProvider>
          </CardContent>
        {/* ))} */}
        </div>
        <div className={classes.head}>
          <Typography className={classes.view}>View Attachments</Typography>
          <Button className={classes.approve} onClick={onViewClickApprove}>Approve</Button><Approve discardHandler={discardHandlerApprove}></Approve>
          <Button className={classes.reject} onClick={onViewClick}>Reject</Button><Reject discardHandler={discardHandler}></Reject>
        </div>
      </div>
    </>
  );
}
