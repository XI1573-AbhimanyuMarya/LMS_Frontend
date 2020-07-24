import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  gridRoot: {
    marginTop: 20,
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
    color: "#FFFFFF",
    textTransform: 'capitalize'
  },
  
  media: {
    height: 40,
    width: 38
  },
  logo: {
    height: 30,
    width: 91.5,
    marginLeft: 50
  },
  error: {
    color: '#ff0033',
    textAlign: 'center',
  },
  dashboardContent: {
    color: '#858585',
  },
  button: {
    marginRight: 20,
    textTransform: 'capitalize',
  },
  dashboardBtn: {
    marginRight: 20,
    textTransform: 'capitalize',
    background: '#621D58',
    color: "#FFFFFF",
  },
  approvalBtn: {
    textTransform: 'capitalize',
    opacity: 0.3
  }
}));