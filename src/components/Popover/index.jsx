import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: '20px',
    width: '14vw',
  },
}));

export default function MouseOverPopover(props) {
  const classes = useStyles();
  const { id, anchorEl, handlePopoverClose, openedPopoverId, userData } = props;

  return (
    <div>
      <Popover
        id={id}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={openedPopoverId === id}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{userData.designation}</Typography>
      </Popover>
    </div>
  );
}
