import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Typography from '@material-ui/core/Typography';
import CourseCatalog from '../CourseCatalog';
import { MESSAGES } from '../../../modules/constants';
import CourseCard from '../CourseCatalog/index';

const Carosals = (props) => {
	const { coursesList, handleCourseClick } = props;
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const chevronWidth = 10;
	let renderCarousel = "";

	
	if (coursesList && Array.isArray(coursesList)) {
		const renderCourses = coursesList.map((course) => {
			return <CourseCard key={course.id} course={course} onButtonClick={handleCourseClick} />
		});

		renderCarousel = <div style={{ padding: `0` }}>
			<ItemsCarousel
				requestToChangeActive={setActiveItemIndex}
				activeItemIndex={activeItemIndex}
				numberOfCards={4}
				gutter={10}
				leftChevron={<ArrowBackIosOutlinedIcon />}
				rightChevron={<ArrowForwardIosOutlinedIcon />}
				outsideChevron
				chevronWidth={chevronWidth}
			>
				{
					renderCourses
				}
			</ItemsCarousel>
		</div>
	}
	return (
		<React.Fragment>
			{
				renderCarousel !== "" ? renderCarousel
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