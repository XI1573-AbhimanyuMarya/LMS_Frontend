import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TopNav from "../../../../components/TopNav";
import { Link, useHistory } from "react-router-dom";
import { BUTTONS, LEARNING_PATH_LABELS } from "../../../../modules/constants";
import Icon from "@material-ui/core/Icon";
import AssingedCourses from "../../../../images/assignLPsucess.png";
import { useStyles } from "./styles";
const SucessPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const handleClosePath = () => {
    console.log("handleclose");
    history.push("/home");
  };
  return (
    <React.Fragment>
      <main className="main-content">
        <Grid container spacing={0} alignItems="center" justify="center">
          <div className={classes.design}>
            <div className={classes.design2}>
              <Icon className={classes.design1}>
                <img src={AssingedCourses} className={classes.combinedshape} />
              </Icon>
            </div>

            <div>
              <Typography
                variant="h5"
                align="center"
                className={classes.assignedLabel}
              >
                {LEARNING_PATH_LABELS.LEARNING_PATH_CREATED}
              </Typography>
            </div>

            <Button
              variant="contained"
              type="button"
              onClick={handleClosePath}
              className={classes.closeButton}
            >
              {BUTTONS.CLOSE}
            </Button>
          </div>
        </Grid>
      </main>
    </React.Fragment>
  );
};
export default SucessPage;
