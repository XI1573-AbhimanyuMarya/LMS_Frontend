import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slider from '@material-ui/core/Slider';

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
      <Container component="main" maxWidth="xs" className = {classes.mainContainer}> 
        <CssBaseline />
      <Typography variant="h6" gutterBottom>
        Select Learning Path Duration
      </Typography>
      
      
        <Slider
        defaultValue={3}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={3}
        min={3}
        max={12}
        aria-labelledby="discrete-slider-custom"
        marks={marks}
      />
      
       
        
      </Container>
    </React.Fragment>
  );
}