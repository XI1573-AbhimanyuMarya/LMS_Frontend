import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemsCarousel from "react-items-carousel";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIos from "../../../images/ArrowForwardIos.svg";
import Typography from "@material-ui/core/Typography";
import CourseCatalog from "../ChartViewCatalog";
import { MESSAGES } from "../../../modules/constants";
import CourseCard from "../../../components/CourseCard/index3";
import { useStyles } from "./style";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RightActiveCarousel from "../../../images/RightActiveCarousel.svg";
import LeftActiveCarousel from "../../../images/LeftActiveCarousel.svg";
import RightDisableCarousel from "../../../images/RightDisableCarousel.svg";
import LeftDisableCarousel from "../../../images/LeftDisableCarousel.svg";
import LearningPathCardWOAction from "../../../components/Card/LearningPathCardWOAction";

const Carosalschart = (props) => {
  const classes = useStyles();
  const { coursesList, handleCourseClick } = props;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  let renderCarousel = "";

  if (coursesList && Array.isArray(coursesList)) {
    const renderCourses = coursesList.map((course, index) => {
      return (
        <CourseCard
          allCourses={course}
          course={course.learningPath}
          key={course.id}
          heading={course.learningPath.name}
          levelId={course.learningPath.competency.id}
          levelName={course.learningPath.competency.name}
          desc={course.learningPath.description}
          onButtonClick={() => {
            handleCourseClick(course, index);
          }}
        />
      );
    });

    console.log(renderCourses, "renderCourses");

    const RightHandler = () => {
      if (activeItemIndex < Math.floor(coursesList.length / 4)) {
        console.log(activeItemIndex);
        setActiveItemIndex(activeItemIndex + 1);
      }
    };
    const LeftHandler = () => {
      console.log(activeItemIndex);
      if (activeItemIndex > 0) {
        console.log(activeItemIndex);
        setActiveItemIndex(activeItemIndex - 1);
      }
    };

    renderCarousel = (
      <div>
        <div
          style={{
            display: "flex",
            width: "98%",
            justifyContent: "space-between",
            marginBottom: "-10",
          }}
        >
          <div className={classes.PopularStuffText}>
            Learning Path You're Taking{" "}
            <img
              src={ArrowForwardIos}
              className={classes.PopularStuffArrowFwd}
            />
          </div>
          <div style={{ marginRight: "10px", marginTop: "-10px" }}>
            {activeItemIndex > 0 ? (
              <img
                src={LeftActiveCarousel}
                style={{ height: "30px", widht: "30px" }}
                onClick={LeftHandler}
              />
            ) : (
              <img
                src={LeftDisableCarousel}
                style={{ height: "30px", widht: "30px" }}
              />
            )}
            {activeItemIndex < Math.floor(coursesList.length / 4) ? (
              <img
                src={RightActiveCarousel}
                style={{ height: "30px", widht: "30px" }}
                onClick={RightHandler}
              />
            ) : (
              <img
                src={RightDisableCarousel}
                style={{ height: "30px", widht: "30px" }}
              />
            )}
          </div>
        </div>

        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={4}
          gutter={20}
          // leftChevron={<ArrowBackIosOutlinedIcon />}
          // rightChevron={<ArrowForwardIosOutlinedIcon />}
          outsideChevron
          chevronWidth={chevronWidth}
          style={{ display: "flex", boxSizing: "border-box" }}
        >
          {renderCourses}
        </ItemsCarousel>
      </div>
      // <>
      //   <div
      //     style={{
      //       display: "flex",
      //       justifyContent: "space-between",
      //       marginBottom: "-10",
      //     }}
      //   >
      //     <div className={classes.PopularStuffText}>
      //       Learning Path You're Taking{" "}
      //       <img
      //         src={ArrowForwardIos}
      //         className={classes.PopularStuffArrowFwd}
      //       />
      //     </div>
      //     <div style={{ marginRight: "10px", marginTop: "-10px" }}>
      //       {activeItemIndex > 0 ? (
      //         <img
      //           src={LeftActiveCarousel}
      //           style={{ height: "30px", widht: "30px" }}
      //           onClick={LeftHandler}
      //         />
      //       ) : (
      //         <img
      //           src={LeftDisableCarousel}
      //           style={{ height: "30px", widht: "30px" }}
      //         />
      //       )}
      //       {activeItemIndex < Math.floor(coursesList.length / 4) ? (
      //         <img
      //           src={RightActiveCarousel}
      //           style={{ height: "30px", widht: "30px" }}
      //           onClick={RightHandler}
      //         />
      //       ) : (
      //         <img
      //           src={RightDisableCarousel}
      //           style={{ height: "30px", widht: "30px" }}
      //         />
      //       )}
      //     </div>
      //   </div>
      //   <ItemsCarousel
      //     activeItemIndex={activeItemIndex}
      //     numberOfCards={4}
      //     outsideChevron
      //     chevronWidth={20}
      //     className={classes.CarouselRoot}
      //   >
      //     {renderCourses}
      //   </ItemsCarousel>
      // </>
    );
  }
  return (
    <React.Fragment>
      {renderCarousel !== "" ? (
        renderCarousel
      ) : (
        <div>
          <Typography variant="h6" align="center">
            {MESSAGES.NO_DATA_FOUND}
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
};

Carosalschart.propTypes = {
  coursesList: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
export default Carosalschart;
