import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector, connect } from "react-redux";
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

import { useStyles } from "./style";
import { ListItemAvatar } from "@material-ui/core";

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

function EmployeeCard(props) {
  const data = props.data;
  const { onDeleteAll, onDelete } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [editOption, setEditOption] = React.useState(false);
  const [discardOption, setDiscardOption] = React.useState(false)
  const learningPathState = useSelector((state) => state.learningPathState);

  const discardHandler = (closeMainModel) => {
    if (closeMainModel) {
      onDeleteAll(learningPathState.deletedEmpData.empID);
    }
    dispatch(Actions.learningPathActions.discardModelOpen(false));
  };

  const handleDiscardClick = (data) => {
    dispatch(Actions.learningPathActions.setDeletedEmp(data));
    dispatch(Actions.learningPathActions.discardModelOpen(true));
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setEditOption(false);
  };
  const handleEditClick = () => {
    setEditOption(!editOption);
    setExpanded(expanded && editOption ? false : true);
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
              <IconButton aria-label="settings"  >
                <DeleteIcon className={classes.deleteIcon} onClick={(e) => 
                  handleDiscardClick(data)} />
                <DiscardPopup discardHandler = {discardHandler} />
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
          <table className={classes.courseStatus1}>
                    <thead className={classes.listData1}>
                      <tr>
                        <th style={{width:"40%",textAlign:"left",padding:"0 0 5px 15px"}}>Learning Path Name</th>
                        <th style={{width:"19%",textAlign:"left",padding:"0 0 5px 0"}}>Start Date</th>
                        <th style={{width:"21%",textAlign:"left",padding:"0 0 5px 0"}}>End Date</th>
                        <th style={{width:"10%"}}></th>
                      </tr>
                    </thead>
                  </table>
                  {console.log(data.learningPath,"data.learningPath")}
            {data.learningPath.map((data, index) => (
              <CardContent key={index} className={classes.learningPath}>
                <ThemeProvider theme={theme}>
                  <Typography aria-label="share" className={classes.listData}>
                    <span className={classes.courseName}>{`${index + 1}. ${data.name
                      }`}</span>
                    <span className={classes.courseName1} style={{display:"flex", justifyContent:"space-between"}}>
                      <span>
                      {" "}
                      {`${data.startDate == null
                        ? "course not started"
                        : data.startDate
                        }`}
                        </span>
                        <span>
                      {" "}
                      {`${data.endDate == null
                        ? "course not started"
                        : data.endDate
                        }`}
                        </span>
                    </span>
                    <span className={classes.percent}>
                    {" "}
                      {`${data.completed == null
                        ? "course not started"
                        : data.completed
                        }%`}
                        </span>
                    {editOption ?
                      <span
                        className={classes.deleteButton}
                        onClick={() => onDelete(data.learningPathEmployeesId)}
                      >X</span>
                      : <span> </span>}
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


const mapStateToProps = (state) => {
  const { learningPathState } = state
  return { discardModelOpen: learningPathState.discardModelOpen }
}
export default connect(mapStateToProps)(EmployeeCard)