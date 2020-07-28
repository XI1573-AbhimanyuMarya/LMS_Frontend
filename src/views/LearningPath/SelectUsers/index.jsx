import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import UserIMG from '../../../images/2.jpg';
import { useStyles } from './style';

const SelectUsers = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Grid>
				<TextField id="standard-search" label="Search Employee" type="search" variant="outlined" className={classes.searchField} />
				<Box bgcolor="#F1F3F7" display="flex" flexDirection="row" p={1} m={1} >
					<Box p={1}>
						<Card className={classes.root}>
							<ListItem>
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src={UserIMG} />
								</ListItemAvatar>
								<ListItemText primary={`Line item `} />
							</ListItem>
						</Card>
					</Box>
					<Box p={1}>
						<Card className={classes.root}>
							<ListItem>
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src={UserIMG} />
								</ListItemAvatar>
								<ListItemText primary={`Line item `} />
							</ListItem>
						</Card>
					</Box>
					<Box p={1}>
						<Card className={classes.root}>
							<ListItem>
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src={UserIMG} />
								</ListItemAvatar>
								<ListItemText primary={`Line item `} />
							</ListItem>
						</Card>
					</Box>
					<Box p={1}>
						<Card className={classes.root}>
							<ListItem>
								<ListItemAvatar>
									<Avatar alt="Remy Sharp" src={UserIMG} />
								</ListItemAvatar>
								<ListItemText primary={`Line item `} />
							</ListItem>
						</Card>
					</Box>
				</Box>
			</Grid>
		</React.Fragment>
	);
}

export default SelectUsers;