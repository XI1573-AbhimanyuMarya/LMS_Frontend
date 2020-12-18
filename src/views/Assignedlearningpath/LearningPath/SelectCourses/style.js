import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	pathName: {
		margin: theme.spacing(2),
	},
	courseLabel: {
		color: '#00000',
		float: 'right',
		padding: '10px'
	},
	searchField: {
		width: '70%',
		background: '#FFFFFF',
		// margin: theme.spacing(2),
	},
	error: {
		color: '#ff0033',
	},
	catalogContainer: {
		background: '#F1F3F7',
		borderRadius: "0.5%",
		padding: theme.spacing(1)
	},
	pathNameField: {
		background: '#FFFFFF',
  },
  head:{
    width: "202px",
    height: "27px",
    // margin: "0 173px 24px 43px",
    fontFamily: "ProximaNova",
    fontSize: "22px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.23,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#621d58"
  }
}));