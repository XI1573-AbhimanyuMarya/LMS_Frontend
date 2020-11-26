import React from "react";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    fontSize: 12,
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center">
      © All rights are reserved with Xebia IT Architect
    </Typography>
  );
};

export default Copyright;
