import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      justifyContent: 'center',
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
      color: "#FFFFFF",
      textTransform: 'capitalize',
      fontSize: 20,
      width: '20%'
    },
    closeButton: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
      color: "#FFFFFF",
      textTransform: 'capitalize',
      fontSize: 20,
      width: '40%'
    },
    breadcrumbs: {
      marginLeft: 35,
      marginTop: 10
    },
    mainContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto'
    },
    active: {
      color: '#621D58 !important',
    },
    completed: {
      color: '#621D58 !important',
      zIndex: 1,
      fontSize: 18,
    },
    assignedLabel: {
      color: '#67B104'
    }
  }));