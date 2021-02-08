import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemsCarousel from "react-items-carousel";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import Typography from "@material-ui/core/Typography";
import CourseCatalog from "../MyCourseCatalog";
import { MESSAGES } from "../../../../modules/constants";
import RightActiveCarousel from "../../../../images/RightActiveCarousel.svg";
import LeftActiveCarousel from "../../../../images/LeftActiveCarousel.svg";
import RightDisableCarousel from "../../../../images/RightDisableCarousel.svg";
import LeftDisableCarousel from "../../../../images/LeftDisableCarousel.svg";
import ArrowForwardIos from "../../../../images/ArrowForwardIos.svg";
import { useStyles } from "./style";

const Carosals1 = (props) => {
  const { lpList, setLpId, setDisable } = props;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const classes = useStyles();
  const chevronWidth = 40;
  let renderCarousel = "";
  if (lpList && Array.isArray(lpList)) {
    // const renderCourses = lpList.map((course) => {
    // 	return <CourseCatalog key={course.id} course={course} />
    // });
    const renderCourses = lpList.map((lp) => {
      return (
        <CourseCatalog
          key={lp.learningPath.learningPathId}
          lp={lp}
          setLpId={setLpId}
          setDisable={setDisable}
        />
      );
    });

    const RightHandler = () => {
      if (activeItemIndex < Math.floor(lpList.length / 4)) {
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
    //const renderCourses="";
    renderCarousel = (
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "-10",
          }}
        >
          <div className={classes.PopularStuffText}>
            Learning Earned{" "}
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
            {activeItemIndex < Math.floor(lpList.length / 4) ? (
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
          leftChevron={<ArrowBackIosOutlinedIcon />}
          rightChevron={<ArrowForwardIosOutlinedIcon />}
          outsideChevron
          chevronWidth={chevronWidth}
          style={{ display: "flex", boxSizing: "border-box" }}
        >
          {renderCourses}
        </ItemsCarousel>
      </div>
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

Carosals1.propTypes = {
  coursesList1: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  // handleCourseClick: PropTypes.func.isRequired,
};

export default Carosals1;
