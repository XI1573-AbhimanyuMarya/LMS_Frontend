import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Actions from '../../../../store/actions';
import { MARKS, LEARNING_PATH_LABELS,SHOW_LEVELS } from '../../../../modules/constants';
import { useStyles, PrettoSlider } from './style';
import Box from '@material-ui/core/Box';

const marks = MARKS;

const SetDuration = () => {
  
	const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
 const{courseIdArr,allLearningPath}= learningPathState;
 const[main,setmain]= useState({})
  useEffect(() => {
    main[learningPathState.courseIdArr[0]]={"id":3,"name":`3 month`}
    dispatch(Actions.learningPathActions.getSliderDuration(main));
  }, []);
	const onSliderHandler = (event,val) => {
		if(val !== "") {
      main[event.currentTarget.id]={"id":val,"name":`${val} month`}
			dispatch(Actions.learningPathActions.getSliderDuration(main))
		}
	}
	return (
		<React.Fragment>
				<Typography variant="h6" align="center" style={{padding:"10px 0px"}}>
					{LEARNING_PATH_LABELS.SELECT_LEARNING_PATH_DURATION}
      	</Typography>
        <div style={{backgroundColor:"white",width:"75vw",minHeight:"55vh",margin:"auto",borderRadius:"8px",overflow:"auto"}}>
        <Container component="main" maxWidth="xs" className={classes.mainContainer}>
          {allLearningPath.map((item)=>(
            ( courseIdArr.indexOf(item.id)>-1)?
              <>
              <Typography variant="h6" align="center" style={{fontWeight:"normal",fontSize:"19px",display:"inline-block"}}>
                <img src={SHOW_LEVELS[`${item.competency.id}-${item.competency.name}`]} style={{width:"100px",height: "38px",marginBottom:"-10px"}}/>{item.name}
              </Typography>
              <PrettoSlider
                defaultValue={ 3 }
                valueLabelDisplay="auto"
                id={item.id}
                step={3}
                min={3}
                max={12}
                aria-labelledby="discrete-slider-custom"
                marks={marks}
                ref={React.createRef}
                onChange={ (id,val) => onSliderHandler(id, val) }
            /></>:''  
            ))}
          </Container>
        </div>	
		</React.Fragment>
	);
}

export default SetDuration;