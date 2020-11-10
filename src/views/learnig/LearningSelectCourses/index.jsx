import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
import Carosals from './Carosals/index';
import Carosals1 from './MyCarosals/index';
import Actions from '../../../store/actions';
import CourseSkelton from '../../../components/Skelton/CourseSkelton';
import CourseSkelton1 from '../../../components/Skelton/MyCourseSkelton';
import { useStyles } from './style';
import { LEARNING_PATH_LABELS } from '../../../modules/constants';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardMedia from '@material-ui/core/CardMedia';
import XebiaLogo from '../../../images/Logo.svg'
import User from '../../../components/User';
import { Link, withRouter } from 'react-router-dom'

const SelectCourses = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const learningPathState = useSelector(state => state.learningPathState);
	const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked, courseIdArr } = learningPathState;
	const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
	const [touch, setTouch] = useState(false);
	const loginState = useSelector(res => res.loginState);
	

	const logoutUser = () => {
        dispatch(Actions.loginActions.logout());
    }
	/**
	 * function to fetch all courses initial time
	 */
	useEffect(() => {
		if(courseIdArr?.length === 0) {
			dispatch(Actions.learningPathActions.fetchAllCourses());
		} else {
			setSelectedCoursesArr(courseIdArr)
		}
	}, []);


	
	const coursesList = filteredCoursesList
						? filteredCoursesList?.length > 0
							? filteredCoursesList
							: ''
						: courses;
						
	const coursesList1 = filteredCoursesList
						? filteredCoursesList?.length > 0
							? filteredCoursesList
							: ''
						: courses;
						
									
	return (
		<React.Fragment>

			  <Grid className={classes.gridRoot} container style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
                <Grid item xs={3}>
                    <CardMedia
                        className={classes.logo}
                        image={XebiaLogo}
                        title="Xebia"
                    />
                </Grid>
                <Grid container item xs={3} justify="center" alignItems="center">
                    <User userData={loginState.user} logout={logoutUser} />
                </Grid>
            </Grid>
			<Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" p={3}>
				<Box alignItems="flex-start" py={2} pl={5}>
					<Typography variant="h6" style={{color:"#621d58"}}>
						{LEARNING_PATH_LABELS.COURSE_CATALOG1}
					</Typography>
				</Box>
				<Box alignItems="center">
					{ isLoading && coursesList1?.length === 0 && <CourseSkelton1 /> }  
					<Carosals1 coursesList={coursesList1}/>
				</Box>
				<br></br>
				<br></br>
				<br></br>
				<Box alignItems="flex-start" py={2} pl={5}>
					<Typography variant="h6" style={{color:"#621d58"}}>
						{LEARNING_PATH_LABELS.COURSE_CATALOG2}
					</Typography>
				</Box>
				<Box alignItems="center">
					{ isLoading && coursesList?.length === 0 && <CourseSkelton /> }  
					<Carosals coursesList={coursesList}/>
				</Box>
			</Box>
		</React.Fragment>
	);
}

export default SelectCourses;