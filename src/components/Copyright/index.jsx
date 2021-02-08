import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 10,
    color:"#858585",
    position: 'fixed',
    bottom: '10px',
    left: '50%'
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center" className={classes.root}>
      &copy; All rights are reserved with Xebia IT Architect
    </Typography>
  );
};

export default Copyright;
