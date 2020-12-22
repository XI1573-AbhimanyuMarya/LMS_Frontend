import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useStyles } from './style';
import Beginner from '../../../../../images/101-Beginner.svg';
import Intermediate from '../../../../../images/102-Intermediate.svg';
import Advance from '../../../../../images/103-Advance.svg';
import Expert from '../../../../../images/104-Expert.svg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';


const levels = {
  "101-Beginner": Beginner,
  "102-Intermediate": Intermediate,
  "103-Advance": Advance,
  "104-Expert": Expert
};

const AssignedCourseCatalog = (props) => {
  const classes = useStyles();
  const { course, handleCourseClick } = props;
  console.log("course in assingedlearningpath coursecatalog",course)
  const courseClass = course.selected && course.selected === true ? classes.selected : classes.root;
  return (
    <Card className={courseClass}>
      <CardActionArea onClick={() => handleCourseClick(course.learningPath.learningPathId)}>
      { console.log("course.selected in learingpath",course.selected)}
        {course.selected && course.selected === true && <CheckCircleIcon className={classes.checkIcon} />}
        <CardContent style={{ minHeight: "135px", maxHeight: "135px" }}>
          <Typography variant="body1" component="h5" className={classes.courseTitle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={classes.pathname} style={{display:"flex"}}>
                {/* <div className={classes.circle}></div> */}
                <FiberManualRecordOutlinedIcon className={classes.circle}></FiberManualRecordOutlinedIcon>
                {course.learningPath.name}
              </div>
              <div>
                <img src={levels[course.learningPath.competency.id + "-" + course.learningPath.competency.name]} className={classes.levIcons} />
              </div>
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.courseDesc} minHeight="130" maxHeight="130">
            {course.learningPath.description}
          </Typography>
        </CardContent>
        <CardActions style={{ backgroundColor: "#f5f5f5", alignItems: "end", minHeight: "35px", maxHeight: "35px", display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" component="h5" className={classes.coursename}>
            {"Course Assigned"}
          </Typography>
          <Typography className={classes.coursename1}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 -5px 0 -2px" }}>
              <div>
                {"888"}
              </div>
              <div>
                <ArrowForwardIosIcon style={{ width: "15px", height: "15px" }}></ArrowForwardIosIcon>
              </div>
            </div>
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

AssignedCourseCatalog.propTypes = {
  course: PropTypes.object.isRequired,
  handleCourseClick: PropTypes.func.isRequired,
};

export default AssignedCourseCatalog;
