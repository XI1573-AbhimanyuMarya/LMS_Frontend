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
import { SHOW_LEVELS } from '../../../../modules/constants';

const CourseCatalog = (props) => {
  const classes = useStyles();
  const {selectedLp}=props;
  const { course, handleCourseClick } = props;
  const courseClass = course.selected && course.selected === true ? classes.selected : classes.root;
 
	return (
		<Card className={courseClass}>
			<CardActionArea onClick={() => handleCourseClick(course.id)}>
				{course.selected && course.selected === true && <CheckCircleIcon className={classes.checkIcon} />}
				<CardContent>
					{/* <Box component="span" className={classes.courseType}>
						{course?.category?.name}
					</Box> */}
					<Typography variant="body1" component="h5" className={classes.courseTitle}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:"11px"}}>
						{course?.name}
            <img style={{ margin:"-5px 0 10px 0"}} src={SHOW_LEVELS[course.competency.id+"-"+course.competency.name]} className={classes[course.competency.name]}/>
            </div>
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p" className={classes.courseDesc}>
						{course?.description}
					</Typography>
				</CardContent>
				{/* <Divider variant="middle" /> */}
				{/* <CardActions>
					<Typography variant="body1" component="h5" className={classes.courseLevel}>
						{course?.competency?.name}
					</Typography>
				</CardActions> */}
			</CardActionArea>
		</Card>
	);
}

CourseCatalog.propTypes = {
    course: PropTypes.object.isRequired,
    handleCourseClick: PropTypes.func.isRequired,
};

export default CourseCatalog;
