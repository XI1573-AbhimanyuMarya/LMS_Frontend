import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../../store/actions";
import { useStyles } from "./style";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
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
  const { selectedLp } = props;
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
  const {
    learningPathCourses,
    // selectedLp,
    attachments,
    isLoading,
  } = learningPathState;
  const { withRate, disable } = props;
  const renderCourseList = learningPathCourses.map((lpcourse) => {
    return (
      <CourseRow
        key={lpcourse.id}
        course={lpcourse}
        lpId={props.lpId}
        learningPathEmployeesId={props.learningPathEmployeesId}
        selectedLp={selectedLp}
        withRate={withRate}
        completed={disable}
      />
    );
  });

  const [show, showGallery] = useState(false);
  const location = useLocation();

  const viewAttachmentHandler = () => {
    let reqBody = {
      lpId: props.learningPathEmployeesId,
      employeeId: loginState.user.id,
    };

    dispatch(Actions.learningPathActions.viewAttachment(reqBody));
    showGallery(true);
  };

  const sendForApprovalHandler = () => {
    let reqBody1 = {
      employeeId: loginState.user.id,
      learningPathId: props.lpId,
    };
    console.log(reqBody1, "1");
    dispatch(Actions.learningPathActions.sendForApproval(reqBody1));
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
      location.pathname === "/dashboard" ||
      location.pathname === "/" ? (
        <>
          <Divider />
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
              onClick={sendForApprovalHandler}
              disabled={
                selectedLp.approvalStatus === "PENDING" ||
                selectedLp.approvalStatus === "APPROVED"
                  ? true
                  : false
              }
            >
              Send for approval
            </LowerCaseButton>
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
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default LearningCoursesTable;
