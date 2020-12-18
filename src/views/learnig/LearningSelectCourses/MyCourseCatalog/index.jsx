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
import {SHOW_LEVELS} from '../../../../modules/constants';

const CourseCatalog1 = (props) => {
	const classes = useStyles();
  const { lp,setLpId } = props;
	const courseClass = lp.selected && lp.selected === true ? classes.selected : classes.root;
	return (
		<Card className={courseClass} style={{border:"1px solid #67b104",maxHeight:"35vh"}}>
			<CardActionArea>
				{/* {course.selected && course.selected === true && <CheckCircleIcon className={classes.checkIcon} />} */}
				<CardContent>
					<div className={classes.cardheader}> 
            <Typography gutterBottom variant="h6" component="h6" className={classes.cardheading}>
              {lp?.learningPath?.name}
            </Typography>
            <img src={SHOW_LEVELS[lp.learningPath.competency.id+'-'+lp.learningPath.competency.name]} className={classes[lp.learningPath.competency.name]}/>  
          </div>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.courseDesc}>
						{lp?.learningPath?.description}
					</Typography>
				</CardContent>
					<Box className={classes.view} style={{color:"white", fontFamily:"robot"}} onClick={()=>setLpId(lp.learningPath.learningPathId)}>
						{"View"}
					</Box>
			</CardActionArea>
		</Card>
	);
}

CourseCatalog1.propTypes = {
    course: PropTypes.object.isRequired,
    // handleCourseClick: PropTypes.func.isRequired,
};

export default CourseCatalog1;
