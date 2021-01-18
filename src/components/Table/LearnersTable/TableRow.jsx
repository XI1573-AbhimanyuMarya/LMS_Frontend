import React from "react";
import { useStyles } from "./style";

const TableRow = (props) => {
  const classes = useStyles();
  const { lp } = props;
  return (
    <tr className={classes.tblrow}>
      <td>{lp.employee.fullName}</td>
      <td>{lp.duration.name}</td>
      <td>{lp.startDate}</td>
      <td>{lp.endDate}</td>
      <td>{lp.percentCompleted}</td>
    </tr>
  );
};

export default TableRow;
