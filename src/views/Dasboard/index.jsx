import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getOr from 'lodash/fp/getOr';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import DiscardPopup from '../../components/DiscardPopup';
import Box from '@material-ui/core/Box';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import XebiaLogo from '../../images/Logo.svg'
import AddLearningPath from '../../images/AddLearningPath.svg'
import DashboardSelected from '../../images/DashboardSelected.svg';
import LearningPathImg from '../../images/LearningPath.svg';
import Approvals from '../../images/Approvals.svg';
import LearningPath from '../LearningPath/index';
import { useStyles } from './style';
import WithLoading from '../../hoc/WithLoading';
import User from '../../components/User';
import Actions from '../../store/actions';
import { Link, withRouter } from 'react-router-dom'

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginState = useSelector(res => res.loginState);
    const userName = getOr('User Name', 'user.fullName', loginState);
    /**
     * function to open learning path model
     */
    const handleClickOpen = () => {
        dispatch(Actions.learningPathActions.pathModelOpen(true));
    };

    const closeHandler = () => {
        dispatch(Actions.learningPathActions.discardModelOpen(true));
    };

    const handleClosePathHandler = () => {
        dispatch(Actions.learningPathActions.pathModelOpen(false));
    }

    const discardHandler = (closeMainModel) => {
        dispatch(Actions.learningPathActions.discardModelOpen(false));
        if (closeMainModel) {
            dispatch(Actions.learningPathActions.pathModelOpen(false));
        }
    }

    const logoutUser = () => {
        dispatch(Actions.loginActions.logout());
    }

    return (
        <Box component="div">
            <Container component="main" maxWidth="xs" className={classes.mainContainer}>
                <CssBaseline />
                <div className={classes.paper}>
                    <CardMedia
                        className={classes.media}
                        image={AddLearningPath}
                        title="Contemplative Reptile"
                    />
                    <Typography component="h1" variant="h5" gutterBottom>
                        Welcome, {userName}
                    </Typography>
                    <Typography component="h1" variant="subtitle2">
                        Please assign first learning path to your team
                    </Typography>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={handleClickOpen}
                        startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 40 }} />}
                    >
                        Create Learning Path
                    </Button>
                </div>
            </Container>
            <LearningPath
                handleClose={closeHandler}
                handleClosePath={handleClosePathHandler}
            />
            <DiscardPopup
                discardHandler={discardHandler}
            />
        </Box>
    );
}

export default WithLoading(Dashboard);