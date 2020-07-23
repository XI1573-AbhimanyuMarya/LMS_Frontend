import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      color: "#FFFFFF"
    },
    root: {
        maxWidth: 345,
      },
    media: {
        height: 40,
        width: 38
    },
    logo: {
        height: 30,
        width: 91.5,
        marginTop: 20,
        marginLeft: 50
    },
    error: {
        color: '#ff0033',
        textAlign: 'center',
    },
    dashboardContent: {
        color: '#858585',
    },
    DashboardBtn: {
        background: '#621D58'
    },
    DashboardSelected: {
        height: 18,
        width: 18
    }
}));