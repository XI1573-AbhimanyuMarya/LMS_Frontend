import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Actions from '../../../../store/actions';
import { MARKS, LEARNING_PATH_LABELS } from '../../../../modules/constants';
import { useStyles, PrettoSlider } from './style';

const marks = MARKS;

const SetDuration = () => {
  
	const classes = useStyles();
  const dispatch = useDispatch();
  const learningPathState = useSelector(state => state.learningPathState);
 const{courseIdArr,mycourses}= learningPathState;
 const[main,setmain]= useState({})
	const onSliderHandler = (event,val) => {
    
		if(val !== "") {
     
      console.log("event",event.currentTarget.id)
      console.log("value in slider",val)
     
      console.log("courseid slected previously", main);
       main[event.currentTarget.id]={"id":val,"name":`${val} month`}
       let tmp;
       tmp=JSON.stringify(main)
       setmain(tmp);
      // console.log("courseid slected", tmp);
      console.log("courseid main", main);
      
			dispatch(Actions.learningPathActions.getSliderDuration(main))
		}
	}
var tem;
	return (
		<React.Fragment>
			<Divider />
			<Container component="main" maxWidth="xs" className={classes.mainContainer}>
				<CssBaseline />
				<Typography variant="h6" align="center">
					{LEARNING_PATH_LABELS.SELECT_LEARNING_PATH_DURATION}
      			</Typography>
            {mycourses.map((item)=>(
            ( courseIdArr.indexOf(item.learningPath.learningPathId)>-1)?
             <>
             
            <Typography variant="h6" align="center" marginTop="5px">
					   {item.learningPath.name}
           </Typography>
             
              <PrettoSlider
              defaultValue={ 3 }
              valueLabelDisplay="auto"
              id={item.learningPath.learningPathId}
              step={3}
              min={3}
              max={12}
              aria-labelledby="discrete-slider-custom"
              marks={marks}
              ref={React.createRef}
              onChange={ (id,val) => onSliderHandler(id, val) }
            /></>:''
             
            ))}	
            {/* <PrettoSlider
              defaultValue={ 3 }
              valueLabelDisplay="auto"
              step={3}
              min={3}
              max={12}
              aria-labelledby="discrete-slider-custom"
              marks={marks}
              onChange={ (e, val) => onSliderHandler(e, val) }
            /> */}
			</Container>
		</React.Fragment>
	);
}

export default SetDuration;