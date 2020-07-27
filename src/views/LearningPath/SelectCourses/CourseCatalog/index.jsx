import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import { useStyles } from './style';

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
        <Button variant="outlined" color="primary" className={classes.courseType}>
        Data Science
        </Button>  
          <Typography variant="body1" component="h5" className={classes.courseTitle}>
          Machine Learning
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.courseDesc}>
          Machine learning is the science of getting computers to act without being explicitly programmed. In the past dec…
          </Typography>
        </CardContent>
      
      <Divider variant="middle" />
      <CardActions>
          <Typography variant="body1" component="h5" className={classes.courseLevel}>
            Advanced
          </Typography>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}
