import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style';

export default function MouseOverPopover(props) {
  const classes = useStyles();
  const { user, popoverState } = props;
  const { openedPopoverId, anchorEl } = popoverState;

  return (
    <div>
      <Popover
						className={classes.popover}
						classes={{
						paper: classes.paper,
						}}
						open={openedPopoverId === user.id}
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
					>
						<Typography variant="body1" component="h5">
							{user.empID}, {user.cOEType}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{user.username}
						</Typography>
					</Popover>
    </div>
  );
}
