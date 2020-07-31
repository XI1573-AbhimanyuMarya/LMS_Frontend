import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getOr from 'lodash/fp/getOr';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import DiscardPopup from '../../components/DiscardPopup';
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

const Dashboard = () => {
    const classes = useStyles();
    const loginState = useSelector(res => res.loginState);
    const dispatch = useDispatch();
    const userName = getOr('User Name', 'user.fullName', loginState);
    const [openPathModel, setPathModelOpen] = useState(false);
    const [openDiscardPopup, setDiscardPopup] = useState(false);

    const handleClickOpen = () => {
        setPathModelOpen(true);
    };

    const closeHandler = () => {
        setDiscardPopup(true);
    };

    const handleClosePathHandler = () => {
        setPathModelOpen(false);
    }

    const discardHandler = (closeMainModel) => {
        setDiscardPopup(false);
        if (closeMainModel) {
            setPathModelOpen(false);
        }
    }

    const logoutUser = () => {
        dispatch(Actions.loginActions.logout());
    }

    return (
        <>
            <Grid className={classes.gridRoot} container >
                <Grid item xs={3}>
                    <CardMedia
                        className={classes.logo}
                        image={XebiaLogo}
                        title="Contemplative Reptile"
                    />
                </Grid>
                <Grid container item xs={6} justify="center" className={classes.dashboardBtns}>
                    <Button
                        variant="contained"
                        className={classes.dashboardBtn}
                        startIcon={<CardMedia
                            className={classes.dashboardIcon}
                            image={DashboardSelected}
                            title="Contemplative Reptile"
                        />}
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CardMedia
                            className={classes.learningPathIcon}
                            image={LearningPathImg}
                            title="Contemplative Reptile"
                        />}
                    >
                        Learning Path
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.approvalBtn}
                        startIcon={<CardMedia
                            className={classes.dashboardIcon}
                            image={Approvals}
                            title="Contemplative Reptile"
                        />}
                    >
                        Approvals
                    </Button>
                </Grid>
                <Grid container item xs={3} justify="center" alignItems="center">
                    <User userData={loginState.user} logout={logoutUser} />
                </Grid>
            </Grid>
            <Container component="main" maxWidth="xs" className={classes.mainContainer}>
                <CssBaseline />
                <div className={classes.paper}>
                    <CardMedia
                        className={classes.media}
                        image={AddLearningPath}
                        title="Contemplative Reptile"
                    />
                    <Typography component="h1" variant="h5">
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
                    >
                        Create Learning Path
                    </Button>
                </div>
            </Container>
            <LearningPath
                openPathModel={openPathModel}
                handleClose={closeHandler}
                handleClosePath={handleClosePathHandler}
            />
            <DiscardPopup
                openDiscardPopup={openDiscardPopup}
                discardHandler={discardHandler}
            />
        </>
    );
}

export default WithLoading(Dashboard);