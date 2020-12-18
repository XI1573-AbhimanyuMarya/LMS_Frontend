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
import DiscardPopup from "../../../components/DiscardPopup/index1";
import Actions from '../../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

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

export default function EmployeeCardApproval(props) {
  const data = props.data;
  const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CardHeader style={{minWidth:"250px", maxWidth:"250px"}}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            title={`${data.employee.fullName} (${data.employee.empID})`}
            subheader={data.employee.designation}
          />
        </ThemeProvider>
        <div style={{minWidth:"50px", maxWidth:"50px"}}>
        {data.learningPath.map((data, index) => (
          <CardContent key={index} className={classes.learningPath} >
            <ThemeProvider theme={theme}>
            <Typography aria-label="share" className={classes.listData} style={{minWidth:"50px", maxWidth:"50px"}}>
              <span className={classes.courseName}>{`${index + 1}. ${data.name
                  }`}</span>
              </Typography>
            </ThemeProvider>
          </CardContent>
        ))}
        </div>
        <div className={classes.head}>
          <Typography className={classes.view}>View Attachments</Typography>
          <Button className={classes.approve}>Approve</Button>
          <Button className={classes.reject}>Reject</Button>
        </div>
      </div>
    </>
  );
}
