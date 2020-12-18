import React from "react";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    fontSize: 10,
    color:"#858585",
    paddingTop:7
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center" className={classes.root}>
      © All rights are reserved with Xebia IT Architect
    </Typography>
  );
};

export default Copyright;
