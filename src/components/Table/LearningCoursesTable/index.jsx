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
import CourseRow from "./CourseRow";
import Gallery from "react-grid-gallery";
import { useLocation } from "react-router-dom";

const LowerCaseButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

const LearningCoursesTable = (props) => {
  const { selectedLp1 = "" } = props;
  const data = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector((state) => state.learningPathState);
  const loginState = useSelector((res) => res.loginState);
  useEffect(() => {
    let reqBody = {
      empid: loginState.user.id,
      ids: props.lpId,
      learningPathEmployeeId: props.learningPathEmployeesId,
    };
    dispatch(Actions.learningPathActions.getLearningPathCourses(reqBody));
  }, []);

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

  const getCourse = (val) => {
    console.log(val, "valllll")
  }
  const renderCourseList = learningPathCourses.map((lpcourse, index) => {
    return (
      // <div
      //   onClick={() => getCourse(lpcourse)}>

      <CourseRow
        allCourses={learningPathCourses}
        // selectedCourseId ={}
        courseId={lpcourse.id}
        key={lpcourse.id}
        course={{ ...lpcourse, index }}
        lpId={props.lpId}
        learningPathEmployeesId={props.learningPathEmployeesId}
        selectedLp={selectedLp1 || selectedLp}
        withRate={withRate}
        completed={disable}
      />
      // </div>
    );
  });

  const [show, showGallery] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadDocument, setUploadDocument] = useState("");
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [loopExit, setLoopExit] = useState(false);
  const location = useLocation();
  const userRole = JSON.parse(sessionStorage.getItem("USER_INFO")).roles[0].roleName;
  useEffect(() => {
    if (uploadDocument === true && loopExit === true) {
      console.log(uploadDocument, "upload document");
      let reqBody1 = {
        employeeId: loginState.user.id,
        learningPathId: props.lpId,
      };
      dispatch(Actions.learningPathActions.sendForApproval(reqBody1));
      setShowSuccess(true);
      setUploadDocument(true);
    }
  }, [uploadDocument, loopExit]);
  const viewAttachmentHandler = () => {
    let reqBody = {
      lpId: props.learningPathEmployeesId,
      employeeId: loginState.user.id,
    };

    dispatch(Actions.learningPathActions.viewAttachment(reqBody));
    showGallery(true);
  };

  const sendForApprovalHandler = () => {
    if (selectedLp1) {
      if (selectedLp1.percentCompleted == 100) {
        setCourseCompleted(true);
      }
      for (var i in mycourses) {
        if (
          mycourses[i].learningPath.learningPathId ==
          selectedLp1.learningPath.learningPathId &&
          mycourses[i].percentCompleted === 100
        ) {
          setCourseCompleted(true);
          for (var i in learningPathCourses) {
            if (learningPathCourses[i].documentsUploaded !== true) {
              setUploadDocument(false);
              return;
            } else {
              setUploadDocument(true);
            }
          }
          setLoopExit(true);
          // if (uploadDocument === true) {
          //   dispatch(Actions.learningPathActions.sendForApproval(reqBody1));
          //   setShowSuccess(true);
          //   setUploadDocument(true);
          // }
          return;
        } else {
          setUploadDocument("");
          setShowSuccess(false);
          setCourseCompleted(false);
        }
      }
    } else {
      if (selectedLp.percentCompleted == 100) {
        setCourseCompleted(true);
      }
      for (var i in mycourses) {
        if (
          mycourses[i].learningPath.learningPathId ==
          selectedLp.learningPath.learningPathId &&
          mycourses[i].percentCompleted === 100
        ) {
          setCourseCompleted(true);
          for (var i in learningPathCourses) {
            if (learningPathCourses[i].documentsUploaded !== true) {
              setUploadDocument(false);
              return;
            } else {
              setUploadDocument(true);
            }
          }
          setLoopExit(true);
          return;
        } else {
          setUploadDocument("");
          setShowSuccess(false);
          setCourseCompleted(false);
        }
      }
    }
  };

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
      {location.pathname === "/learningpath" ||
        (location.pathname === "/dashboard" && userRole != "ROLE_MANAGER") ||
        location.pathname === "/" ? (
          <>
            <Divider />
            {!props.button &&
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "5px 0 0 0",
                }}
              >
                <LowerCaseButton
                  type="button"
                  variant="contained"
                  className={classes.navSubmit}
                  onClick={() => {
                    sendForApprovalHandler();
                    handleClick();
                  }}
                  disabled={
                    (selectedLp1
                      ? selectedLp1.approvalStatus === "PENDING" ||
                      selectedLp1.approvalStatus === "APPROVED"
                      : selectedLp.approvalStatus === "PENDING" ||
                        selectedLp.approvalStatus === "APPROVED"
                        ? true
                        : false) || showSuccess
                  }
                >
                  Send for approval
            </LowerCaseButton>

                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  {/* {selectedLp1 ? (
                selectedLp1.percentCompleted
              ) : selectedLp.percentCompleted === 100 ? ( */}
                  {showSuccess ? (
                    <Alert onClose={handleClose} severity="success">
                      The learning path has been successfully sent for approval!
                    </Alert>
                  ) : uploadDocument === false ? (
                    <Alert onClose={handleClose} severity="error">
                      Upload your documents
                    </Alert>
                  ) : !courseCompleted ? (
                    <Alert onClose={handleClose} severity="error">
                      Complete the courses first
                    </Alert>
                  ) : (
                          <Alert onClose={handleClose} severity="error">
                            An Error Occured, Please try again
                          </Alert>
                        )}

                  {/* ) : (
               
              )} */}
                </Snackbar>
                <LowerCaseButton
                  type="button"
                  variant="contained"
                  className={classes.navSubmit1}
                  startIcon={<VisibilityIcon style={{ fontSize: 20 }} />}
                  onClick={viewAttachmentHandler}
                >
                  View attachments
            </LowerCaseButton>
                {show && attachments.length !== 0 && !isLoading && (
                  <Gallery
                    images={attachments}
                    showImageCount={false}
                    showLightboxThumbnails={true}
                    lightboxWidth={600}
                    isOpen={true}
                    lightboxWillClose={() => showGallery(false)}
                    rowWidth=""
                  />
                )}
              </span>
            }
          </>
        ) : (
          ""
        )}
    </>
  );
};

export default LearningCoursesTable;
