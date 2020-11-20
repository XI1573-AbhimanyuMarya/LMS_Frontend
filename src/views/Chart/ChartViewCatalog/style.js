import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    // border: '2px solid #A9A9A9'
    height: 20
  },
  courseType: {
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 400,
    borderRadius: 15,
    padding: 3,
    color: '#4a90e2',
    border: '1px solid #B2C8E4',
  },
  courseLevel: {
    fontSize: 15,
    fontWeight: 600,
    color: '#858585'
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#000000',
    marginTop: 10,
    marginBottom: 10,
    //margin: theme.spacing(1),
  },
  courseDesc: {
    fontSize: 12,
    color: '#858585'
  },
  selected: {
    maxWidth: 345,
    border: '2px solid #67B104',

  },
  checkIcon: {
    color: '#67B104',
    float: 'right'
  },
  resume: {
    border: '1px solid #f07301',
    borderRadius: "8px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: '4px',
    height: '20px',
    margin: '0 3px 0 0',
    background: '#858585'
  },
  rectangle1: {
    width: '4px',
    height: '15px',
    margin: '0 3px 0 0',
    background: '#858585'
  },
  rectangle2: {
    width: '4px',
    height: '10px',
    margin: '0 3px 0 0',
    background: '#858585'
  },
  rectangle3: {
    width: '4px',
    height: '25px',
    margin: '0 18px 0 0',
    background: '#858585'
  },
  rectanglew: {
    width: '4px',
    height: '20px',
    margin: '0 3px 0 0',
    background: '#eaeaea'
  },
  rectangle1w: {
    width: '4px',
    height: '15px',
    margin: '0 3px 0 0',
    background: '#eaeaea'
  },
  rectangle2w: {
    width: '4px',
    height: '10px',
    margin: '0 3px 0 0',
    background: '#eaeaea'
  },
  rectangle3w: {
    width: '4px',
    height: '25px',
    margin: '0 18px 0 0',
    background: '#eaeaea'
  }
}));