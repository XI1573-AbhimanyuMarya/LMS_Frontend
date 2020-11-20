import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "23%",
    margin: " 13px 8px 35px",
    borderRadius: "8px",
    boxShadow: "2px 4px 10px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  delete: {
    marginTop: "-40px",
    marginRight: " 12px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  // button: {
  //   padding: "12px 12px 7px",
  // },
}));

export default function EmployeeCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <EditIcon
              style={{
                width: "14px",
                height: "14px",
                color: "#027aff",
              }}
            />
          </IconButton>
        }
        title="EmployeeName"
        subheader="Designation"
      />
      <CardHeader
        className={classes.delete}
        action={
          <DeleteIcon
            style={{
              width: "14px",
              height: "14px",
              color: "#ff2600",
            }}
          />
        }
      />

      <CardActions
        style={{ padding: "2px", margin: "-9px 0px -9px 15px " }}
        disableSpacing
      >
        <Typography aria-label="share">
          <span style={{ fontSize: "12px" }}>
            5. five learning path assigned
          </span>
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          title="show me"
        >
          <ExpandMoreIcon className={classes.button} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent disableSpacing>
          <Typography paragraph>Employee learning path</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
