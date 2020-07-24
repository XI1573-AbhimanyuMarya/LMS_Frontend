import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

import { useStyles } from './style';

const marks = [
  {
    value: 3,
    label: '3 Months',
  },
  {
    value: 6,
    label: '6 Months',
  },
  {
    value: 9,
    label: '9 Months',
  },
  {
    value: 12,
    label: '12 Months',
  },
];

function valuetext(value) {
  return `${value}°C`;
}
export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box width={1/3} className={classes.sliderBox}>
      <Typography variant="h6" gutterBottom>
        Select Learning Path Duration
      </Typography>
      
      
        <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={3}
        min={3}
        max={12}
        aria-labelledby="discrete-slider-custom"
        marks={marks}
      />
      
       
        
      </Box>
    </React.Fragment>
  );
}