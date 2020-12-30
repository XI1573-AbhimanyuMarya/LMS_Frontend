import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Typography from '@material-ui/core/Typography';
import CourseCatalog from '../CourseCatalog';
import { MESSAGES } from '../../../../../modules/constants';
import Scrollbars from 'react-custom-scrollbars'
import { useStyles } from '../CourseCatalog/style';

import LearningPathCard from '../../../../../components/Card/LearningPathCard';

const AssignedCarosals = (props) => {
	const { coursesList, handleCourseClick ,allLearningPath} = props;
	const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const classes = useStyles();
  let renderCarousel = "";

	if (coursesList && Array.isArray(coursesList)) {
    let lp;
    const renderCourses = coursesList.map((course) => {
      lp={learningPath:{id:course.id,name:course.name,competency:{...course.competency},description:course.description}};
      return <LearningPathCard key={course.id} selectedLp={lp} handleCourseClick={handleCourseClick} assignLp={true} onButtonClick={()=>alert("hi")}/>
      //return <CourseCatalog key={course.id} course={course} handleCourseClick={handleCourseClick} />
		});

		renderCarousel = <div className={classes.card} style={{ padding: `0px 10px 5px`, display:"flex", flexWrap:"wrap", overflow:"auto"}}>
				{
					renderCourses
				}
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

AssignedCarosals.propTypes = {
    coursesList: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
    handleCourseClick: PropTypes.func.isRequired,
};

export default AssignedCarosals;