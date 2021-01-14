import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useStyles } from "./style";
import { SHOW_LEVELS } from "../../../../modules/constants";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../../../store/actions";

import Button from "@material-ui/core/Button";

const CourseCatalog1 = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lp, setLpId, setDisable } = props;
  const courseClass =
    lp.selected && lp.selected === true ? classes.selected : classes.root;
  const viewClickHandler = () => {
    //setLpId(lp.learningPath.learningPathId);
    dispatch(Actions.learningPathActions.selectLearningPath(lp));
    setDisable(true);
  };
  return (
    <div>
      <Card
        style={{ margin: 0, border: "1px solid #67b104" }}
        className={classes.CardRoot}
      >
        <CardContent className={classes.cardcontent}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={classes.cardheader}>{lp?.learningPath?.name}</div>
            <img
              src={
                SHOW_LEVELS[
                  lp.learningPath.competency.id +
                    "-" +
                    lp.learningPath.competency.name
                ]
              }
              className={classes[lp.learningPath.competency.name]}
            />
          </div>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.courseDesc}
          >
            {lp?.learningPath?.description}
          </Typography>
        </CardContent>

        <Box className={classes.view} onClick={viewClickHandler}>
          {"View"}
        </Box>
      </Card>
    </div>
  );
};

CourseCatalog1.propTypes = {
  lp: PropTypes.object.isRequired,
  // handleCourseClick: PropTypes.func.isRequired,
};

export default CourseCatalog1;
