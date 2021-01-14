import React from "react";
import { useStyles } from "./style";

import { ViewDetails } from "../../Button";

const TableRow = (props) => {
  const classes = useStyles();
  const { lp } = props;
  return (
    <tr className={classes.tblrow}>
      <td>{lp.learningPathName}</td>
      <td>{lp.employeesAssignedCount}</td>
      <td>{lp.employeesCompletedCount}</td>
      <td>{lp.employeesInprogressCount}</td>
      <td style={{color:"#e76600"}}>{lp.employeesOverdueCount}</td>
      <td><ViewDetails/></td>
    </tr>
  );
};

export default TableRow;
