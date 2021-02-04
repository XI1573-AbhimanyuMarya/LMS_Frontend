import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../../store/actions";
import { useStyles } from "./style";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CourseRow from "./CourseRow1";
import Gallery from "react-grid-gallery";
import { useLocation } from "react-router-dom";

const LowerCaseButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

const LearningCoursesTable = (props) => {
  // debugger;
  const { selectedLp1 = "" } = props;
  const data = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const loginState = useSelector((res) => res.loginState);


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    learningPathCourses,
    selectedLp,
    attachments,
    isLoading,
    mycourses,
  } = learningPathState;
  const { withRate, disable } = props;

  const renderCourseList = (selectedLp1.learningPath.courses).map((lpcourse) => {
    return (
      <CourseRow
        key={lpcourse.id}
        course={lpcourse}
        lpId={props.lpId}
        learningPathEmployeesId={props.learningPathEmployeesId}


        completed={disable}
      />
    );
  });
  // console.log(selectedLp.approvalStatus, "renderCourseList");

  const [show, showGallery] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadDocument, setUploadDocument] = useState("");
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [loopExit, setLoopExit] = useState(false);
  const location = useLocation();
  const userRole = JSON.parse(sessionStorage.getItem("USER_INFO")).roles[0].roleName;



  return (
    <>
      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          height: "35vh",
          margin: "35px 0px 10px 0px",
        }}
      >
        <table className={classes.tbl}>
          <thead className={classes.tblheading}>
            <tr>
              <th style={{ width: "25%" }}>Course Name</th>
              <th style={{ width: "20%" }}>Learning Category</th>
              <th style={{ width: withRate ? "20%" : "50%" }}>Level</th>
              {withRate && <th style={{ width: "35%" }}>Learning Progress</th>}
            </tr>
          </thead>
          <tbody className={classes.tblbody}>{renderCourseList}</tbody>
        </table>
      </div>

    </>
  );
};

export default LearningCoursesTable;
