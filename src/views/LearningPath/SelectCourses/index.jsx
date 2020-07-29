import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Carosals from './Carosals/index';
import { useStyles } from './style';

const SelectCourses = (props) => {
	const classes = useStyles();

	useEffect(() => {
		console.log('SelectCourses')
	}, []);
	const { coursesList } = props;
	return (
		<React.Fragment>
			<TextField id="standard-search" label="Search Course" type="search" variant="outlined" className={classes.searchField} />
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