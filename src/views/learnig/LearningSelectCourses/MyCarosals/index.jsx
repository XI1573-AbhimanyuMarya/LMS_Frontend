import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Typography from '@material-ui/core/Typography';
import CourseCatalog from '../MyCourseCatalog';
import { MESSAGES } from '../../../../modules/constants';

const Carosals1 = (props) => {
	const { lpList,setLpId,setDisable } = props;
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const chevronWidth = 40;
  let renderCarousel = "";
	if (lpList && Array.isArray(lpList)) {
		// const renderCourses = coursesList.map((course) => {
		// 	return <CourseCatalog key={course.id} course={course} />
    // });
    const renderCourses=lpList.map((lp)=>{
      return <CourseCatalog key={lp.learningPath.learningPathId} lp={lp} setLpId={setLpId} setDisable={setDisable}/>
    });
    //const renderCourses="";
		renderCarousel = <div>
			<ItemsCarousel
				requestToChangeActive={setActiveItemIndex}
				activeItemIndex={activeItemIndex}
				numberOfCards={3}
				gutter={20}
				leftChevron={<ArrowBackIosOutlinedIcon />}
				rightChevron={<ArrowForwardIosOutlinedIcon />}
				outsideChevron
        chevronWidth={chevronWidth}
        style={{display:"flex",boxSizing:"border-box"}}
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

Carosals1.propTypes = {
    coursesList1: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
    // handleCourseClick: PropTypes.func.isRequired,
};

export default Carosals1;