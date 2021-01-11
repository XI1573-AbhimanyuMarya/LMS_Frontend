import React from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TopNav from '../../../../components/TopNav';
import {  BUTTONS } from '../../../../modules/constants';
import Icon from "@material-ui/core/Icon";
const SucessPage = () => {
  handleClosePath=()=>{
    console.log("handleclose")
  }
  return (
    <React.Fragment>
       <TopNav></TopNav>
      <main className="main-content">
      <CheckCircleIcon className={classes.checkIcon} />
        <Typography variant="h5" align="center" className={classes.assignedLabel}>
          {"hi"}
        </Typography>
      <Button
        variant="contained"
        type="button"
        onClick={handleClosePath}
        className={classes.closeButton}
      >
        {BUTTONS.CLOSE}
      </Button>
      </main>
     
    </React.Fragment>
  );
};
export default SucessPage;
