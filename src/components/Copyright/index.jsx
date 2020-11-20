import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' © '}
      <Link to="" >
        All rights are reserved with Xebia IT Architect
          </Link>
    </Typography>
  );
}

export default Copyright;