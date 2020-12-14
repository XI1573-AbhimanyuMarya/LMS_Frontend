import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Typography from '@material-ui/core/Typography';
import CourseCatalog from '../CourseCatalog';
import { MESSAGES } from '../../../../modules/constants';
import CourseCard from '../../../../components/CourseCard';

const Carosals = (props) => {
	const { coursesList, handleCourseClick } = props;
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const chevronWidth = 40;
  let renderCarousel = "";
  let renderCourses="";
  console.log(coursesList);
	if (coursesList && Array.isArray(coursesList)) {
    console.log(coursesList);
    renderCourses=coursesList.map((course)=>{
      return (<CourseCard key={course.learningPath.learningPathId} course={course} onButtonClick={handleCourseClick} showButton={true} />)
    });
		//renderCourses = coursesList.map((course) => {
			//return course.learningPath.courses.map(item => (
			//<CourseCard course={course} onButtonClick={handleCourseClick} showButton={true} />
				//))
			// return <CourseCatalog key={course.id} course={course} handleCourseClick={handleCourseClick} />

    //});

		renderCarousel = <div style={{ padding: `0 ${chevronWidth}px` }}>
			{/* <ItemsCarousel
				requestToChangeActive={setActiveItemIndex}
				activeItemIndex={activeItemIndex}
				numberOfCards={4}
				gutter={20}
				leftChevron={<ArrowBackIosOutlinedIcon />}
				rightChevron={<ArrowForwardIosOutlinedIcon />}
				outsideChevron
				chevronWidth={chevronWidth}
			> */}
				{
					renderCourses
				}
			{/* </ItemsCarousel> */}
		</div>
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