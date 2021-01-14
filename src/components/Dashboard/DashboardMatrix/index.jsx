import React from 'react';
import TotalCard from '../../Card/TotalCard';
import StatusWiseCard from '../../Card/StatusWiseCard';
import LearningPathGraph from '../../Graph/LearningPathGraph';
import { useStyles } from "./style";

const DashboardMatrix=(props)=>{
  const classes=useStyles();
  const {totalCardDetail,Completed,Inprogress,Overdue}=props.data;
  return (
    <div className={classes.Rectangle}>
      <div className={classes.CardContainer}>
        <TotalCard heading={totalCardDetail.heading} Total={totalCardDetail.Total}/>
        <StatusWiseCard Completed={Completed} Inprogress={Inprogress} Overdue={Overdue}/>
      </div>
      <LearningPathGraph/>
    </div>
  );
};

export default DashboardMatrix;