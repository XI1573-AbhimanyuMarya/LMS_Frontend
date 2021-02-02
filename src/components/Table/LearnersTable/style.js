import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    background: "none",
    color: "#7a7a7a",
    textTransform: "lowercase",
    fontSize: 12,
    marginBottom: "20px",
  },
  tbl: {
    minWidth: "100%",
    marginTop: "35px",
    borderCollapse: 'collapse',
  },
  tblrow: {
    "& td": {
      padding: "5px 12px",
    },
  },
  tblbody: {
    fontSize: "12px",
  },
  tblheading: {
    "& tr": {
      "& th": {
        padding: "15px 10px 7px",
        textAlign: "left",
        fontWeight: "normal",
        opacity: "0.7",
      },
    },
    backgroundColor: "white",
    fontSize: "12px",
  },
  Beginner: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  Intermediate: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  Advance: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  Expert: {
    width: "80px",
    marginRight: "-5px",
    marginBottom: "10px",
    height: "38px",
  },
  cardContainer: {
    marginLeft: '10px'
  },
  outerContainer: {
    marginLeft: '20px',
  },
  tblheadingFirst: {
    width: "25%", 
    paddingLeft: "28px !important"
  }
}));
