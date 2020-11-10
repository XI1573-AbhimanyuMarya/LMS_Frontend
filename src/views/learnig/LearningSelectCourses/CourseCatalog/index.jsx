import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useStyles } from './style';

const CourseCatalog = (props) => {
	const classes = useStyles();
	const { course, handleCourseClick } = props;
	const courseClass = course.selected && course.selected === true ? classes.selected : classes.root;
	return (
		<Card className={courseClass}>
			<CardActionArea>
				{course.selected && course.selected === true && <CheckCircleIcon className={classes.checkIcon} />}
				<CardContent>
					<div style={{display:"flex", justifyContent:"space-between"}}>
					<Box component="span" className={classes.courseType}>
						{course?.category?.name}
					</Box>
					
					<div style={{display:"flex", alignItems:"flex-end"}}>
				
					{(course.competency.name=='Beginner') ?

						<><div className={classes.rectangle2}>
						</div>
						<div className={classes.rectangle1w}>
						</div>
						<div className={classes.rectanglew}>
						</div>
						<div className={classes.rectangle3w}>
						</div>
						</>
						
						: 
					
						(course.competency.name=='Mediocre') ?

						<><div className={classes.rectangle2}>
						</div>
						<div className={classes.rectangle1}>
						</div>
						<div className={classes.rectanglew}>
						</div>
						<div className={classes.rectangle3w}>
						</div>
						</>

						:

						(course.competency.name=='Advanced') ?

						<><div className={classes.rectangle2}>
						</div>
						<div className={classes.rectangle1}>
						</div>
						<div className={classes.rectangle}>
						</div>
						<div className={classes.rectangle3w}>
						</div>
						</>

						:

						<><div className={classes.rectangle2}>
						</div>
						<div className={classes.rectangle1}>
						</div>
						<div className={classes.rectangle}>
						</div>
						<div className={classes.rectangle3}>
						</div>
						</>

	}

					<Typography variant="body1" component="h5" className={classes.courseLevel}>
						{course?.competency?.name}
					</Typography>
					</div>
					</div>
					<Typography variant="body1" component="h5" className={classes.courseTitle}>
						{course?.name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p" className={classes.courseDesc}>
						{course?.description}
					</Typography>
				</CardContent>
		
					<Box className={classes.resume} style={{color:"#f07402", fontFamily:"robot"}}>
						{"Resume"}
					</Box>
			</CardActionArea>
			
		</Card>
		
	);
}

CourseCatalog.propTypes = {
    course: PropTypes.object.isRequired,
    // handleCourseClick: PropTypes.func.isRequired,
};

export default CourseCatalog;
