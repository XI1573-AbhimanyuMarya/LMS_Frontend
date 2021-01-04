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
import {useDispatch} from 'react-redux';
import Actions from '../../../../../store/actions';

const AssignedCarosals = (props) => {
  const dispatch=useDispatch();
	const { coursesList, handleCourseClick ,allLearningPath} = props;
	const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const classes = useStyles();
  let renderCarousel = "";
	if (coursesList && Array.isArray(coursesList)) {
    const lpArr=coursesList.map((course)=>(
      {learningPath:
        {
          id:course.id,
          learningPathId:course.id,
          name:course.name,
          competency:{...course.competency},description:course.description
        }
      }
      )
    );
    const renderCourses=lpArr.map((lp)=>{
      return <LearningPathCard key={lp.learningPath.id} selectedLp={lp} handleCourseClick={handleCourseClick} assignLp={true} onButtonClick={()=>dispatch(Actions.learningPathActions.selectLearningPath(lp))}/>
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