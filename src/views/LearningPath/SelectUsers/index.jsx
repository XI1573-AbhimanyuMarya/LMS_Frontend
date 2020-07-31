import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useStyles } from './style';
import Actions from '../../../store/actions';
import { MESSAGES } from '../../../modules/constants';
import UserSkelton from '../../../components/Skelton/UserSkelton';

const SelectUsers = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const learningPathState = useSelector(state => state.learningPathState);
	const { users, filteredUsersList, isLoading } = learningPathState;
	const [selectedUsersArr, setSelectedUsersArr] = useState([]);

	/**
	 * function to fetch all users initial time
	 */
	useEffect(() => {
		dispatch(Actions.learningPathActions.fetchAllUsers());	
	}, []);

	/**
	 * function to filter users
	 */
	let filterUsers = [];
	const changeHandler = (e) => {
		const {value} = e.target;
		const searchValue = value.toLowerCase();
		if(users.length > 0) {
			filterUsers = users.filter(function (el) {
				return el.fullName.toLowerCase().includes(searchValue) ||
						el.username.toLowerCase().includes(searchValue) ||
						el.empID.toLowerCase().includes(searchValue) ||
						el.designation.toLowerCase().includes(searchValue);
				});
			dispatch(Actions.learningPathActions.getFilteredUsers(filterUsers));	
		}
	}
	/**
	 * function to select users
	 */
	let selectedUsers = [];
	const onUserClickHandler = (userId) => {
		if(userId !== "") {
			const idArr = selectedUsersArr;
			const index = idArr.indexOf(userId);
			if(index > -1) {
				idArr.splice(index, 1);
			} else {
				idArr.push(userId);
			}
			setSelectedUsersArr(idArr);

			selectedUsers = users.map(function (el) {
				if(el.id === userId) {
					!el.selected ? el.selected = true : el.selected = false;
				}
				return el;
			});	
			dispatch(Actions.learningPathActions.getSelectedUsers(selectedUsers, selectedUsersArr));
		}
	}

	const usersList = filteredUsersList
						? filteredUsersList.length > 0
							? filteredUsersList.slice(0, 16)
							: ''
						: users.slice(0, 16);
	let renderUsers	= "";				
	if (usersList && Array.isArray(usersList)) {
		renderUsers = usersList.map((user) => {
			const userClass = user.selected && user.selected === true ? classes.selected : classes.box;
			const name = user.fullName.split("  ");
			const classNameHolder = [
				classes.orangeAvtar,
				classes.purpleAvtar, 
				classes.greenAvtar,
				classes.yellowAvtar,
				classes.blueGreyAvtar,
				classes.pinkAvtar,
			];
			return (
				<Box p={0.5} key={user.id}>
					
					<Card className={userClass}  onClick={() => onUserClickHandler(user.id)}>
						<ListItem>
							<ListItemAvatar>
								<Avatar className={classNameHolder[Math.floor(Math.random() * 6)]}>{name[0]?.charAt(0)+name[1]?.charAt(0)}</Avatar>
							</ListItemAvatar>
							<ListItemText primary={user.fullName} />
						</ListItem>
						{user.selected && user.selected === true && <CheckCircleIcon className={classes.checkIcon}/>}
					</Card>
				</Box>
			)	
		})
	}	
	return (
		<React.Fragment>
			<Grid>
				<TextField id="standard-search" label="Search Employee" type="search" variant="outlined" className={classes.searchField}  name="searchEmployee" onChange={changeHandler}/>
				<Box bgcolor="#F1F3F7" display="flex" flexDirection="row" p={1} m={1} flexWrap="wrap" css={{ maxWidth: '100%' }}>
				{isLoading && usersList.length === 0 && <UserSkelton />}
				{
					renderUsers !== "" ? renderUsers
					: 
					<div>
						<Typography variant="h6" align="center">
							{MESSAGES.NO_DATA_FOUND}
						</Typography>
					</div>
				}
					
				</Box>
			</Grid>
		</React.Fragment>
	);
}

export default SelectUsers;