// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { Box, CardActionArea } from "@material-ui/core";
// import { useStyles } from "./style";
// import BarIcon from "../SignalIcon";
// import ProgressBar from "../ProgressBar";
// import { SHOW_LEVELS } from "../../modules/constants";

// const CourseCard = (props) => {
//   const classes = useStyles();
//   const { course = {}, onButtonClick, showButton } = props;
//   // course.progress = "";
//   let btnlabel = "Let's begin";
//   // if (course?.progress) {
//   //   btnlabel = "Explore";
//   // }

//   let darkBar = 0;
//   if (course?.competency?.name === "Beginner") {
//     darkBar = 1;
//   } else if (course?.competency?.name === "Intermediate") {
//     darkBar = 2;
//   } else if (course?.competency?.name === "Expert") {
//     darkBar = 3;
//   }

//   return (
//     <Card style={{ marginRight: "20px" }} className={classes.root}>
//       <CardActionArea>
//         {/* {course.selected && course.selected === true && <CheckCircleIcon className={classes.checkIcon} />} */}
//         <CardContent className={classes.cardcontent}>
//           <div className={classes.cardheader}>
//             <Typography
//               gutterBottom
//               variant="h6"
//               component="h6"
//               className={classes.courseTitle}
//             >
//               {course.name}
//             </Typography>
//             {/* <Typography
//               gutterBottom
//               variant="h6"
//               component="h6"
//               className={classes.cardheading}
//             >
//               {lp?.learningPath?.name}
//             </Typography> */}
//             <img
//               src={
//                 SHOW_LEVELS[
//                   course?.competency.id + "-" + course?.competency.name
//                 ]
//               }
//               className={classes[course?.competency.name]}
//             />
//           </div>

//           <Typography
//             variant="body2"
//             color="textSecondary"
//             component="p"
//             className={classes.courseDesc}
//           >
//             {course.description}
//           </Typography>
//         </CardContent>

//         <CardActions className={classes.action}>
//           <Button size="large" className={classes.btn} onClick={onButtonClick}>
//             {btnlabel}
//           </Button>
//         </CardActions>

//       </CardActionArea>
//     </Card>

//   );
// };

// export default CourseCard;

import React from "react";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { SHOW_LEVELS } from "../../modules/constants";
import { useStyles } from "./style";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const CourseCard = (props) => {
  const classes = useStyles();
  const { course = {}, onButtonClick, showButton } = props;
  // course.progress = "";
  let btnlabel = "Let's begin";
  // if (course?.progress) {
  //   btnlabel = "Explore";
  // }

  let darkBar = 0;
  if (course?.competency?.name === "Beginner") {
    darkBar = 1;
  } else if (course?.competency?.name === "Intermediate") {
    darkBar = 2;
  } else if (course?.competency?.name === "Expert") {
    darkBar = 3;
  }
  return (
    <>
      <Card className={classes.CardRoot}>
        <CardContent className={classes.CardContent}>
          <div style={{ display: "flex" }}>
            <div className={classes.CardHeading}>{props.heading}</div>
            <img
              src={SHOW_LEVELS[`${props.levelId}-${props.levelName}`]}
              className={classes[`${props.levelName}`]}
            />
          </div>
          <div style={{ minHeight: "52px" }} className={classes.CardDesc}>
            {props.desc}
          </div>
        </CardContent>

        <CardActions className={classes.action}>
          <Button
            size="large"
            className={classes.btn}
            onClick={props.onButtonClick}
          >
            {btnlabel}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CourseCard;
