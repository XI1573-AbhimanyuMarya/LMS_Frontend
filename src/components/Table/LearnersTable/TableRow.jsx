import React from "react";
import { useStyles } from "./style";
import { SHOW_LEVELS } from '../../../modules/constants';

const TableRow = (props) => {
  const classes = useStyles();
  const { lp } = props;
  return (
    <tr className={classes.tblrow}>
      <td>{lp.employee.fullName}</td>
      <td> <img src={SHOW_LEVELS[`${props.levelId}-${props.levelName}`]} className={classes[`${props.levelName}`]}/></td>
      <td>{lp.startDate}</td>
      <td>{lp.endDate}</td>
      <td>{lp.percentCompleted}</td>
    </tr>
  );
};

export default TableRow;
