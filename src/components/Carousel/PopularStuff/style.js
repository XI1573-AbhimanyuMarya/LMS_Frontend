import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  PopularStuffText:{
    width: "215px",
    height: "20px",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.32",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#621d58",
  },
  PopularStuffArrowFwd:{
    width:"4px",height:"8px"
  },
  CarouselRoot:{
    display: "flex", boxSizing: "border-box"
  }
}));