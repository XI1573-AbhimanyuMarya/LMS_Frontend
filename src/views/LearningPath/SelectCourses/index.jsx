import React, {useEffect} from 'react';
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

const SelectCourses = () => {
	const classes = useStyles();
	const learningPathState = useSelector(state => state.learningPathState);
  	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(Actions.learningPathActions.fetchAllCourses());
	}, []);
	const { courses, filteredCoursesList } = learningPathState;
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
	const coursesList = filteredCoursesList && filteredCoursesList.length > 0 ? filteredCoursesList : courses;
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
				<Carosals coursesList={coursesList} />
			</Box>
		</React.Fragment>
	);
}

export default SelectCourses;