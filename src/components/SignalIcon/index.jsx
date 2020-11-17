import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const barColor = '#eaeaea';
const barColorDark = '#858585';
export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative"
  },
  leftBar: {
    display: 'inline-block',
    width: '4px',
    height: '10px',
    margin: '12px 3px 0 0',
    backgroundColor: `${barColor}`,
    position: "absolute",
    right: "20px"
  },
  middleBar: {
    display: 'inline-block',
    width: '4px',
    height: '16px',
    margin: '6px 4px 0 3px',
    backgroundColor: `${barColor}`,
    position: "absolute",
    right: "10px"
  },
  rightBar: {
    display: 'inline-block',
    width: '4px',
    height: '22px',
    margin: '0 0 0 4px',
    backgroundColor: `${barColor}`,
    position: "absolute",
    right: "5px"
  },
  barDark: {
    backgroundColor: `${barColorDark}`
  }
}))

const BarIcon = (props) => {
  const classes = useStyles();
  const { darkBar } = props;
  // const darkBar = 2;
  const bars = ["leftBar", "middleBar", "rightBar"]
  return (
    <div className={classes.root}>
      {bars.map((name, i) => {
        if (i < darkBar) {
          return <span className={[classes[name], classes.barDark].join(' ')} key={i}></span>
        } else {
          return <span className={classes[name]} key={i}></span>

        }
      })
      }
    </div>
  )
}

export default BarIcon;
