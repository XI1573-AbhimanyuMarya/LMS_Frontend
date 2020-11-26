import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DiscardPopup from "../../../components/DiscardPopup";

import { useStyles } from "./style";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body2: {
        fontSize: "12px",
      },
    },
    MuiCardHeader: {
      subheader: {
        fontSize: "11px",
      },
    },
    MuiList: {
      root: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiListItemText: {
      secondary: {
        fontSize: "10px",
        color: "#282828",
        marginRight: "10px",
      },
    },
  },
});

export default function EmployeeCard(props) {
  const data = props.data;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [editOption, setEditOption] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setEditOption(false);
  };
  const handleEditClick = () => {
    setEditOption(!editOption);
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {};
  const onEditButtonClick = () => {};

  return (
    <>
      <div>
        <Card key={data.empID} className={classes.root}>
          <ThemeProvider theme={theme}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
              }
              action={
                <IconButton aria-label="settings" onClick={handleEditClick}>
                  <EditIcon className={classes.editIcon} />
                </IconButton>
              }
              title={`${data.employee.fullName} (${data.employee.empID})`}
              subheader={data.employee.designation}
            />
          </ThemeProvider>
          <CardHeader
            className={classes.delete}
            action={
              <IconButton aria-label="settings" onClick={handleDeleteClick}>
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            }
            subheader={data.employee.location}
          />

          <CardActions className={classes.cardActions}>
            <Typography aria-label="share" className={classes.pathTitle}>
              {data.learningPath.length}- Learning Path Assigned
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon className={classes.button} />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {data.learningPath.map((data, index) => (
              <CardContent key={index} className={classes.learningPath}>
                <ThemeProvider theme={theme}>
                  <Typography aria-label="share" className={classes.listData}>
                    <span className={classes.courseName}>{`${index + 1}. ${
                      data.name
                    }`}</span>
                    <span className={classes.courseStatus}>
                      {" "}
                      {`start- ${
                        data.startDate == null
                          ? "course not started"
                          : data.startDate
                      }`}
                    </span>
                    <span
                      className={classes.deleteButton}
                      onClick={onEditButtonClick}
                    >{`${editOption ? "X" : ""}`}</span>
                  </Typography>
                </ThemeProvider>
              </CardContent>
            ))}
          </Collapse>
        </Card>
      </div>
    </>
  );
}
