import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Carosals from './Carosals/index';
import { useStyles } from './style';
import Actions from '../../../store/actions';
import CourseSkelton from '../../../components/Skelton/CourseSkelton';

const SelectCourses = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const learningPathState = useSelector(state => state.learningPathState);
	const { courses, filteredCoursesList, isLoading } = learningPathState;
	const [selectedCoursesArr, setSelectedCoursesArr] = useState([]);
	
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
		if(courses.length > 0) {
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
	
	const coursesList = filteredCoursesList
						? filteredCoursesList.length > 0
							? filteredCoursesList
							: ''
						: courses;					
	return (
		<React.Fragment>
			<TextField id="standard-search" label="Search Course" type="search" variant="outlined" className={classes.searchField} name="searchName" onChange={changeHandler}/>
			<Box bgcolor="#F1F3F7" p={3} >
				<FormControl>
					<InputLabel htmlFor="standard-search" className={classes.courseLabel}>Course Name*</InputLabel>
					<TextField fullWidth id="standard-search" label="Backend Course" type="search" variant="outlined" className={classes.courseField} />
				</FormControl>
				<Divider variant="middle" />
				<Typography variant="h6" className={classes.catalogTitle}>
					Course Catalog
          		</Typography>
				{ isLoading && coursesList.length === 0 && <CourseSkelton /> }  
				<Carosals coursesList={coursesList} handleCourseClick={(id) => onCourseClickHandler(id)}/>
			</Box>
		</React.Fragment>
	);
}

export default SelectCourses;