import React, { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import LearningPathCardWOAction from "../../Card/LearningPathCardWOAction";
import ArrowForwardIos from "../../../images/ArrowForwardIos.svg";
import ItemsCarousel from "react-items-carousel";
import { useStyles } from "./style";
import RightActiveCarousel from "../../../images/RightActiveCarousel.svg";
import LeftActiveCarousel from "../../../images/LeftActiveCarousel.svg";
import RightDisableCarousel from "../../../images/RightDisableCarousel.svg";
import LeftDisableCarousel from "../../../images/LeftDisableCarousel.svg";

const PopularStuffCarousel = (props) => {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { managerPopularStuff } = props;
  let renderCards = ``;
  if (managerPopularStuff.length !== 0 && Array.isArray(managerPopularStuff)) {
    renderCards = managerPopularStuff.map((item) => {
      return (
        <LearningPathCardWOAction
          key={item.id}
          heading={item.name}
          levelId={item.competency.id}
          levelName={item.competency.name}
          desc={item.description}
        />
      );
    });
  }
  const RightHandler = () => {
    if (activeItemIndex < Math.floor(managerPopularStuff.length / 4)) {
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
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "-10",
        }}
      >
        <div className={classes.PopularStuffText}>
          Popular Stuff{" "}
          <img src={ArrowForwardIos} className={classes.PopularStuffArrowFwd} />
        </div>
        <div style={{ marginRight: 10, marginTop: "-10px" }}>
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
          {activeItemIndex < Math.floor(managerPopularStuff.length / 4) ? (
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
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        outsideChevron
        chevronWidth={20}
        className={classes.CarouselRoot}
      >
        {renderCards}
      </ItemsCarousel>
    </>
  );
};

export default PopularStuffCarousel;
