import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
// import Carosals from './Carosals/index';
import Actions from '../../../store/actions';
import CourseSkelton from '../../../components/Skelton/CourseSkelton';
import { useStyles } from './style';
import { LEARNING_PATH_LABELS,SHOW_LEVELS,LEVELS } from '../../../modules/constants';

const SelectCourses1 = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const learningPathState = useSelector(state => state.learningPathState);
	const { courses, filteredCoursesList, isLoading, learningPathName,learningPathDes,learningPathLevel, firstNextClicked, courseIdArr } = learningPathState;
	const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
	const [touch, setTouch] = useState(false);

	/**
	 * function to fetch all courses initial time
	 */
	useEffect(() => {
		if (courseIdArr?.length === 0) {
			dispatch(Actions.learningPathActions.fetchAllCourses());
		} else {
			setSelectedCoursesArr(courseIdArr)
		}
	}, []);

	/**
	 * function to filter courses
	 */
	let filterCourses = [];
	const changeHandler = (e) => {
		const { value } = e.target;
		const searchValue = value.toLowerCase();
		if (courses?.length > 0) {
			filterCourses = courses.filter(function (el) {
				return el.name.toLowerCase().includes(searchValue) ||
					el.category.name.toLowerCase().includes(searchValue) ||
					el.competency.name.toLowerCase().includes(searchValue);
			});
			dispatch(Actions.learningPathActions.getFilteredCourses(filterCourses));
		}
	}
	/**
	 * function to select courses
	 */
	let selectedCourses = [];
	const onCourseClickHandler = (courseId) => {
		if (courseId !== "") {
			const idArr = selectedCoursesArr;
			const index = idArr.indexOf(courseId);
			if (index > -1) {
				idArr.splice(index, 1);
			} else {
				idArr.push(courseId);
			}
			setSelectedCoursesArr(idArr);

			selectedCourses = courses.map(function (el) {
				if (el.id === courseId) {
					!el.selected ? el.selected = true : el.selected = false;
				}
				return el;
			});
			dispatch(Actions.learningPathActions.getSelectedCourses(selectedCourses, selectedCoursesArr));
		}
	}
	/**
	 * function to set learning path name
	 */
	const onChangeHandler = (e) => {
		const pathName = e.target.value;
		setTouch(true);
		dispatch(Actions.learningPathActions.getLearningPathName(pathName));
  }
  

	const onChangeHandlerDes = (e) => {
		const pathDes = e.target.value;
		setTouch(true);
		dispatch(Actions.learningPathActions.getLearningPathDes(pathDes));
  }
  
  const onClickHandlerLevel = (e) => {
    const pathLevel = e.target.className;
		setTouch(true);
		dispatch(Actions.learningPathActions.getLearningPathLevel(pathLevel));
	}

	const coursesList = filteredCoursesList
		? filteredCoursesList?.length > 0
			? filteredCoursesList
			: ''
    : courses;
  
  const renderLevels=LEVELS.map((level)=>{
    return ((level.id==learningPathLevel) ? <img src={SHOW_LEVELS[level.id+'-'+level.value+'1']} style={{width:"132px",height:"56px", margin:"0 0 0 12px"}} className={level.id} onClick={onClickHandlerLevel}/> : <img src={SHOW_LEVELS[level.id+'-Outlined'+level.value+'1']} style={{width:"132px",height:"56px",margin:"0 0 0 12px"}} className={level.id} onClick={onClickHandlerLevel}/>);
  });
  

	return (
		<React.Fragment>
			<Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" >
				<Grid container className={classes.pathName}>
					<Grid item xs={3}>
					</Grid>
					<Grid item xs={6}>
						<TextField error={(!learningPathName && touch) || (!learningPathName && firstNextClicked) ? true : false}
							fullWidth id="standard-search"
							label={LEARNING_PATH_LABELS.LEARNING_PATH_NAME}
							type="search"
							variant="outlined"
							onChange={onChangeHandler}
							className={classes.pathNameField}
							size="small"
							value={learningPathName ? learningPathName : ''}
						/>
					</Grid>
				</Grid>
				<Divider variant="middle" />
			</Box>
      <Box className={classes.catalogContainer} height="150px" display="flex-inline" justifyContent="center" >
				<Grid container className={classes.pathName}>
					<Grid item xs={3}>
					</Grid>
					<Grid item xs={6} style={{height:"50px"}}>
						<TextField error={(!learningPathDes && touch) || (!learningPathDes && firstNextClicked) ? true : false}
              fullWidth id="standard-search"
							label={LEARNING_PATH_LABELS.LEARNING_PATH_DESCRIPTION}
							type="search"
							variant="outlined"
							onChange={onChangeHandlerDes}
							className={classes.pathNameField}
              size="large"
              multiline
              rows={4}
              value={learningPathDes ? learningPathDes : ''}
						/>
					</Grid>
				</Grid>
			</Box>
      <Box className={classes.catalogContainer} display="flex" justifyContent="center" margin="0 0 0 0">
        {renderLevels}
      </Box>
		</React.Fragment>
	);
}

export default SelectCourses1;