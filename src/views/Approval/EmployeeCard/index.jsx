import React,{useState} from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Actions from '../../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import Approve from '../../../components/DiscardPopup/approve'
import Reject from '../../../components/DiscardPopup/Reject'
import {ApproveButton,RejectButton} from '../../../components/Button'
import { useStyles } from "./style";
import Copyright from "../../../components/Copyright";
import Gallery from 'react-grid-gallery';

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
        paddingBottom: "0px"
      },
    },
    MuiListItemText: {
      secondary: {
        fontSize: "10px",
        color: "#282828",
        marginRight: "10px",
      },
    }
  },
});

export default function EmployeeCardApproval(props) {
  const data = props.data;
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const { pfApproval,attachments,isLoading } = learningPathState;
  
  const loginState = useSelector((state) => state.loginState);

  const onViewClick = () => {
    dispatch(Actions.learningPathActions.RejectModelOpen(true));
  }

  const discardHandler = () => {
    dispatch(Actions.learningPathActions.RejectModelOpen(false));
  }

  const onViewClickApprove = () => {
    let reqBody={
      learningPathEmployeeId:data.learningPathEmployeesId,
      status:"APPROVED"
    };
    dispatch(Actions.learningPathActions.ApproveModelOpen(true));
    dispatch(Actions.learningPathActions.getApprovalRejects(reqBody));
  }

  const rejectHandler=(reviewMessage)=>{
    let reqBody={
      learningPathEmployeeId:data.learningPathEmployeesId,
      status:"REJECTED",
      reviewMessage:reviewMessage
    };
    dispatch(Actions.learningPathActions.RejectModelOpen(false));
    dispatch(Actions.learningPathActions.getApprovalRejects(reqBody));
  }

  const discardHandlerApprove = () => {
    dispatch(Actions.learningPathActions.ApproveModelOpen(false));  
  }

  const [show,showGallery]=useState(false);

  const viewAttachmentHandler=()=>{
    let reqBody={
      lpId:data.learningPathEmployeesId,
      employeeId:data.employee.id
    };
    dispatch(Actions.learningPathActions.viewAttachment(reqBody));
    showGallery(true); 
  }

  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CardHeader style={{ minWidth: "270px", maxWidth: "270px" }}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            title={<Typography style={{display:"flex", fontSize:"15px"}}>{data.employee.fullName}&#160;<Typography style={{fontSize:"13px", color:"rgba(0, 0, 0, 0.54)"}}>({data.employee.empID})</Typography></Typography>}
            subheader={data.employee.designation}
          />
        </ThemeProvider>
        <div style={{ minWidth: "50px", maxWidth: "50px" }}>
          <CardContent className={classes.learningPath} >
            <ThemeProvider theme={theme}>
            <Typography aria-label="share" className={classes.listData} style={{minWidth:"103px"}}>
              <span className={classes.courseName}>{` ${data.learningPath.name}`}
                   </span>
              </Typography>
            </ThemeProvider>
          </CardContent>
        </div>
        <div className={classes.head}>
          <Typography className={classes.view} onClick={viewAttachmentHandler}>View Attachments</Typography>
          {show && attachments.length!==0 && !isLoading && <Gallery images={attachments} showImageCount={false} showLightboxThumbnails={true} lightboxWidth={600} isOpen={true} lightboxWillClose={()=>showGallery(false)} rowWidth=""/> }
          <ApproveButton onViewClickApprove={onViewClickApprove}/><Approve discardHandler={discardHandlerApprove} data={data}></Approve>
          <RejectButton onViewClick={onViewClick}/><Reject discardHandler={discardHandler} rejectHandler={rejectHandler}></Reject>
        </div>
      </div>
      <div className="copyright">
        <Copyright />
      </div>
    </>
  );
}