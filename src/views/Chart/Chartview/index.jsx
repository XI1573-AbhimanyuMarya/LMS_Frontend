import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Typography from '@material-ui/core/Typography';
import CourseCatalog from '../ChartViewCatalog';
import { MESSAGES } from '../../../modules/constants';
import CourseCard from '../../../components/CourseCard';
import { useStyles } from './style';

const Carosals1 = (props) => {
  const classes = useStyles();
  const { coursesList, handleCourseClick } = props;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  let renderCarousel = "";
  if (coursesList && Array.isArray(coursesList)) {
    const renderCourses = coursesList.map((course) => {
      // return <CourseCatalog key={course.id} course={course} handleCourseClick={handleCourseClick} />
      return <CourseCard key={course.id} course={course} onButtonClick={handleCourseClick} />
    });

    renderCarousel = <div >
      <ItemsCarousel 
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<ArrowBackIosOutlinedIcon className={classes.left}/>}
        rightChevron={<ArrowForwardIosOutlinedIcon className={classes.right} />}
        outsideChevron
        alwaysShowChevrons={true}
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

Carosals1.propTypes = {
  coursesList: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  // handleCourseClick: PropTypes.func.isRequired,
};
export default Carosals1;