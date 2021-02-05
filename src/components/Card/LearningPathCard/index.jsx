import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, CardActionArea } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SHOW_LEVELS } from '../../../modules/constants';
import ArrowForwardIos from '../../../images/ArrowForwardIos.svg';
import GreenChecked from '../../../images/GreenChecked.svg';
import { useStyles } from './style';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { CourseAssignButton } from '../../Button';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../../store/actions';

const LearningPathCard = (props) => {
  const [isChecked, setisChecked] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const loginState = useSelector(res => res.loginState);
  const { selectedLp, onButtonClick, handleCourseClick } = props;
  const assignLp = props.assignLp ? props.assignLp : false;
  const inlineStyle = {
    margin: "0px 25px 25px 0px"
  }
  inlineStyle.border = isChecked ? "1px solid #39b215" : "";
  const onClickHandler = () => {
    handleCourseClick(selectedLp.learningPath.id);
    setisChecked(!isChecked);
  }

  const { learningPathCourses } = learningPathState;
  return (
    <>
      <Card className={classes.root} style={inlineStyle}>
        <CardActionArea onClick={onClickHandler}>
          <CardContent style={{ minHeight: "143px" }}>
            <div className={classes.cardheader}>
              <div style={{ display: "flex" }}>
                {assignLp && isChecked && <img src={GreenChecked} style={{ width: "26px", height: "24px" }} />}
                {assignLp && !(isChecked) && <CircleUnchecked onClick={onClickHandler} />}
                <Typography gutterBottom variant="h6" component="h6" className={classes.cardheading}>
                  {selectedLp.learningPath.name}
                </Typography>
              </div>
              <img src={SHOW_LEVELS[selectedLp.learningPath.competency.id + '-' + selectedLp.learningPath.competency.name]} className={classes[selectedLp.learningPath.competency.name]} />
            </div>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.carddesc}>
              {selectedLp.learningPath.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardfooter}>
            <Typography gutterBottom variant="h6" component="h6" className={classes.cardfootertext}>
              Course Assigned
          </Typography>
            <CourseAssignButton count={selectedLp.learningPath.courses.length} assignLp={assignLp} onButtonClick={onButtonClick} />
          </CardActions>
        </CardActionArea>
      </Card>

    </>
  );
}

export default LearningPathCard;


//<div style={{maxWidth:"350px"}}><LearningPathCard /></div>