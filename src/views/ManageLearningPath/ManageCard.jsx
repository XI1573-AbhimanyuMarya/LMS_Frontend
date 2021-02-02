import React,{useState,useEffect} from 'react';
import {Card,CardContent,CardActions,CardActionArea} from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SHOW_LEVELS } from '../../modules/constants';
import GreenChecked from '../../images/GreenChecked.svg';
import { useStyles } from './style';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { useSelector, useDispatch } from 'react-redux';
// import Actions from '../../store/actions';

const ManageCard = (props) => {
  const [isChecked,setisChecked] = useState(false);
  const classes=useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
  const loginState = useSelector(res => res.loginState);
  const {cardDetails,onButtonClick,handleCourseClick} = props;
  const inlineStyle={
    margin:"0px 25px 25px 0px"
  }
  inlineStyle.border = isChecked ? "1px solid #39b215" : "";

  const onClickHandler=()=>{
    setisChecked(!isChecked);
  }

  useEffect(() => {
    setisChecked(false);
  }, [learningPathState.adminLearningPathManageDetails]);

  return (
    <>
    <Card className={classes.root} style={inlineStyle} onClick={onClickHandler}>
      <CardActionArea>  
        <CardContent style={{minHeight:"143px"}}>
          <div className={classes.cardheader}>
            <div style={{display:"flex"}}>
            {isChecked && <img src={GreenChecked} style={{width:"26px",height:"24px"}}  />}
            {!(isChecked) && <CircleUnchecked onClick={onClickHandler}/>}
            <Typography gutterBottom variant="h6" component="h6" className={classes.cardheading}>
              {cardDetails?.name}
            </Typography>
            </div>
            <img src={SHOW_LEVELS[cardDetails?.competency.id+'-'+cardDetails?.competency.name]} className={classes[cardDetails?.competency.name]}/>  
          </div>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.carddesc}>
            {cardDetails?.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardfooter}>
          <Typography gutterBottom variant="h6" component="h6" className={classes.cardfootertext}>
            Course Assigned <span className={classes.spanNumber}>{cardDetails.coursesCount}</span>
          </Typography>
          <Typography gutterBottom variant="h6" component="h6" className={classes.cardfootertext}>
            People linked <span className={classes.spanNumber}>{cardDetails.employeesCount}</span>
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
    
    </>
  );
}

export default ManageCard;
