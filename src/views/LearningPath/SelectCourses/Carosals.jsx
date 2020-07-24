import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CourseCatalog from './CourseCatalog';

const Carosals = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<ArrowBackIosOutlinedIcon />}
        rightChevron={<ArrowForwardIosOutlinedIcon />}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <CourseCatalog />
        <CourseCatalog />
        <CourseCatalog />
        <CourseCatalog />
        <CourseCatalog />
      </ItemsCarousel>
    </div>
  );
};

export default Carosals;