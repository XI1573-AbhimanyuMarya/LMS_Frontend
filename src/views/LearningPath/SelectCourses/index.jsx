import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Carosals from './Carosals/index';
import { useStyles } from './style';
import Actions from '../../../store/actions';
import CourseSkelton from '../../../components/Skelton/CourseSkelton';
import { Grid } from '@material-ui/core';

const SelectCourses = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const learningPathState = useSelector(state => state.learningPathState);
	const { courses, filteredCoursesList, isLoading, learningPathName, firstNextClicked } = learningPathState;
	const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
	const [touch, setTouch] = useState(false);
	
	/**
	 * function to fetch all courses initial time
	 */
	useEffect(() => {
		dispatch(Actions.learningPathActions.fetchAllCourses());
	}, []);

	/**
	 * function to filter courses
	 */
	let filterCourses = [];
	const changeHandler = (e) => {
		const {value} = e.target;
		const searchValue = value.toLowerCase();
		if(courses?.length > 0) {
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
		if(courseId !== "") {
			const idArr = selectedCoursesArr;
			const index = idArr.indexOf(courseId);
			if(index > -1) {
				idArr.splice(index, 1);
			} else {
				idArr.push(courseId);
			}
			setSelectedCoursesArr(idArr);

			selectedCourses = courses.map(function (el) {
				if(el.id === courseId) {
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
	
	const coursesList = filteredCoursesList
						? filteredCoursesList?.length > 0
							? filteredCoursesList
							: ''
						: courses;					
	return (
		<React.Fragment>
			<Box component='div' display="flex" justifyContent="center">
				<TextField id="standard-search" label="Search Course" type="search" variant="outlined" className={classes.searchField} name="searchName" onChange={changeHandler}/>
			</Box>
			<Box className={classes.catalogContainer} display="flex-inline" justifyContent="center" p={3}>
				<Grid container className={classes.pathName}>
					<Grid item xs={3}>
						<InputLabel htmlFor="standard-search" className={classes.courseLabel}>Learning Path Name<Box component="span" className={classes.error}>*</Box></InputLabel>
					</Grid>	
					<Grid item xs={6}>
						<TextField error={(!learningPathName && touch) || (!learningPathName && firstNextClicked) ? true: false} fullWidth id="standard-search" label="Learning Path Name" type="search" variant="outlined" onChange={onChangeHandler} className={classes.pathNameField}/>
					</Grid>	
				</Grid>
				<Divider variant="middle" />
				<Box alignItems="flex-start" py={2} pl={5}>
					<Typography variant="h6">
						Course Catalog
					</Typography>
				</Box>
				<Box alignItems="center">
					{ isLoading && coursesList?.length === 0 && <CourseSkelton /> }  
					<Carosals coursesList={coursesList} handleCourseClick={(id) => onCourseClickHandler(id)}/>
				</Box>
			</Box>
		</React.Fragment>
	);
}

export default SelectCourses;