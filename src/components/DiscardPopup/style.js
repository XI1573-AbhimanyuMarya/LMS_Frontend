import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    discardButton: {
        background: 'linear-gradient(180deg, #FFAB39 0%, #F07200 100%)',
		color: "#FFFFFF",
        textTransform: 'capitalize',
        fontSize: 15,
        fontWeight: 500,
    },
    cancelButton: {
        textTransform: 'capitalize',
        border: '2px solid #858585',
        color: '#858585',
        fontSize: 15,
        fontWeight: 500,
    },
    dailogTitle: {
        color: '#621D58',
    }
}));