import React from 'react';
import {Card,CardHeader,CardContent,CardActions,CardActionArea} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SHOW_LEVELS } from '../../../modules/constants';
import { useStyles } from './style';

const LearningPathCard = (props) => {
  const classes=useStyles();
  const {selectedLp}=props;
  return (
    <Card className={classes.root}>
      <CardActionArea>  
        <CardContent>
          <div className={classes.cardheader}>
            <Typography gutterBottom variant="h6" component="h6" className={classes.cardheading}>
              {selectedLp.learningPath.name}
            </Typography>
            <img src={SHOW_LEVELS[selectedLp.learningPath.competency.id+'-'+selectedLp.learningPath.competency.name]} className={classes[selectedLp.learningPath.competency.name]}/>  
          </div>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.carddesc}>
            {selectedLp.learningPath.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardfooter}>
          <Typography gutterBottom variant="h6" component="h6" className={classes.cardfootertext}>
            Course Assigned
          </Typography>
          <Button size="small" variant="outlined" className={classes.cardfooterbtn}>
            888
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default LearningPathCard;


//<div style={{maxWidth:"350px"}}><LearningPathCard /></div>