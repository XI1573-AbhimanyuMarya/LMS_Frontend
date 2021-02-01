import React from "react";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { SHOW_LEVELS } from "../../modules/constants";
import { useStyles } from "./style2";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
const CourseCard = (props) => {
  const classes = useStyles();
  const { allCourses, course = {}, onButtonClick, showButton } = props;
  // course.progress = "";
  let buttonColor = 0;
  let btnlabel = "Let's begin";
  if (allCourses.percentCompleted > 0) {
    buttonColor = 1;
    btnlabel = "Explore";
  }

  let darkBar = 0;
  if (course?.competency?.name === "Beginner") {
    darkBar = 1;
  } else if (course?.competency?.name === "Intermediate") {
    darkBar = 2;
  } else if (course?.competency?.name === "Expert") {
    darkBar = 3;
  }
  return (
    <div>
      <Card className={classes.CardRoot}>
        <CardContent className={classes.cardcontent}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={classes.cardheader}>{props.heading}</div>
            <img
              src={SHOW_LEVELS[`${props.levelId}-${props.levelName}`]}
              className={classes[`${props.levelName}`]}
            />
          </div>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.courseDesc}
          >
            {props.desc}
          </Typography>
        </CardContent>

        <Box className={classes.btn} onClick={props.onButtonClick}>
          {btnlabel}
        </Box>
      </Card>
    </div>
  );
};

export default CourseCard;
