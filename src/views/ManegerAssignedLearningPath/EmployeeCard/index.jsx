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
import ListItemText from "@material-ui/core/ListItemText";
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
      },
    },
  },
});

export default function EmployeeCard(props) {
  const data = props.data;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
                <IconButton aria-label="settings">
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
              <IconButton aria-label="settings">
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
                  <ListItemText
                    secondary={`${index + 1} ${data.name}    start- ${
                      data.startDate == null
                        ? "course not started"
                        : data.startDate
                    }`}
                  />
                </ThemeProvider>
              </CardContent>
            ))}
          </Collapse>
        </Card>
      </div>
    </>
  );
}
