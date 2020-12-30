import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Typography from '@material-ui/core/Typography';
import CourseCatalog from '../CourseCatalog';
import { MESSAGES } from '../../../../modules/constants';
import CourseCard from '../../../../components/CourseCard';
import Actions from '../../../../store/actions';
import { useSelector, useDispatch } from 'react-redux';

const Carosals = (props) => {
  const { coursesList,setLpId } = props;
  const dispatch = useDispatch();
	const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const handleCourseClick=(id)=>{
    dispatch(Actions.learningPathActions.getLearningPathCourses(id));
  }
  let renderCourses="";
	if (coursesList && Array.isArray(coursesList)) {
    renderCourses=coursesList.map((course)=>{
      return (<CourseCard key={course.learningPath.learningPathId} course={course} onButtonClick={()=>setLpId(course.learningPath.learningPathId)} showButton={true} />)
    });
    //onButtonClick={()=>handleCourseClick(course.learningPath.learningPathId)}
	}
	return (
		<React.Fragment>
			{
				renderCourses !== "" ? renderCourses
					:
					<div>
						<Typography variant="h6" align="center">
							{MESSAGES.NO_DATA_FOUND}
						</Typography>
					</div>
			}
		</React.Fragment>
	);
};

Carosals.propTypes = {
	coursesList: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	// handleCourseClick: PropTypes.func.isRequired,
};

export default Carosals;