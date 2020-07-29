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

	const {courses} = learningPathState;
	const changeHandler = (e) => {
		const {name, value} = e.target;
		const filterCourses = courses.filter(function (el) {
			return el.name.includes(value) ||
				   el.category.name.includes(value) ||
				   el.competency.name.includes(value);
			});
		console.log('filterCourses', filterCourses)
		console.log('courses', courses)	
	}
	//const {courses} = learningPathState;
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
				<Carosals coursesList={courses} />
			</Box>
		</React.Fragment>
	);
}

export default SelectCourses;