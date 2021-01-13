import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import UserSkelton from '../../../../components/Skelton/UserSkelton';
import Actions from '../../../../store/actions';
import { MESSAGES, LEARNING_PATH_LABELS } from '../../../../modules/constants';
import { useStyles } from './style';

import Popover from '../../../../components/Popover';

const SelectUsers = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const learningPathState = useSelector(state => state.learningPathState);
	const { users, filteredUsersList, isLoading, userIdArr } = learningPathState;
	const [selectedUsersArr, setSelectedUsersArr] = useState([]);
	/**
	 * function to fetch all users initial time
	 */
	useEffect(() => {
		if(userIdArr?.length === 0) {
			dispatch(Actions.learningPathActions.fetchAllUsers());
		} else {
			setSelectedUsersArr(userIdArr);
		}		
	}, []);

	/**
	 * function to filter users
	 */
	let filterUsers = [];
	const changeHandler = (e) => {
		const {value} = e.target;
		const searchValue = value.toLowerCase();
		if(users?.length > 0) {
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

	const [popoverState, setPopoverState] = useState({
		openedPopoverId: false,
      	anchorEl: null,
	})

	const handlePopoverOpen = (event, popoverId) => {
		const element = event.target;
		setPopoverState(prevState => ({
			...prevState,
			openedPopoverId: popoverId,
			anchorEl: element,
		}));
	}
	const handlePopoverClose = () => {
		setPopoverState(prevState => ({
			...prevState,
			openedPopoverId: null,
			anchorEl: null,
		}));
	}

	const usersList = filteredUsersList
						? filteredUsersList?.length > 0
							? filteredUsersList?.slice(0, 16)
							: ''
						: users?.slice(0, 16);
	let renderUsers	= "";				
	if (usersList && Array.isArray(usersList)) {
		renderUsers = usersList.map((user) => {
			const userClass = user.selected && user.selected === true ? classes.selected : classes.box;
			const name = user.fullName.split("  ");
			return (
				
				<Box 
				p={0.5} 
				key={user.id}
				>
					<Card className={userClass}  onClick={() => onUserClickHandler(user.id)} onMouseEnter={(e) => handlePopoverOpen(e, user.id)}
                onMouseLeave={handlePopoverClose}>
						<ListItem>
							<ListItemAvatar>
								<Avatar className={classes.blueGreyAvtar}>{name[0]?.charAt(0)+name[1]?.charAt(0)}</Avatar>
							</ListItemAvatar>
							<ListItemText 
               primary={<Typography style={{fontSize:"14px", display:"flex", padding:"0 0 10px 0"}}>{user.fullName}&#160;&#160;<Typography style={{fontSize:"11px", color:"rgba(0, 0, 0, 0.54)", margin:"2px 0 0 0"}}>({user.empID})</Typography></Typography>}
               secondary={<Typography style={{fontSize:"11px", color:"rgba(0, 0, 0, 0.54)"}}>{user.designation}<Typography style={{fontSize:"11px", color:"rgba(0, 0, 0, 0.54)", margin:"2px 0 0 0"}}>{user.cOEType}</Typography><Typography style={{fontSize:"11px", color:"rgba(0, 0, 0, 0.54)", margin:"2px 0 0 0"}}> {user.username}</Typography></Typography>}
              />
							
						</ListItem>
            
						{user.selected && user.selected === true && <CheckCircleIcon className={classes.checkIcon}/>}
					</Card>
					{/* <Popover user={user} popoverState={popoverState} />		 */}
				</Box>
				
			)	
		})
	}	
	return (
		<React.Fragment>
			<Box component='div' display="flex" justifyContent="center">
				<TextField 
					id="standard-search" 
					label={LEARNING_PATH_LABELS.SEARCH_EMPLOYEE} 
					type="search" 
					variant="outlined" 
					className={classes.searchField}  
					name="searchEmployee" 
					size="small"
					onChange={changeHandler}
          />
			</Box>
			<Box className={classes.usersContainer} display="flex" flexDirection="row" flexWrap="wrap"  justifyContent="center" py={3}>
				{isLoading && usersList?.length === 0 && <UserSkelton />}
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
		</React.Fragment>
	);
}

export default SelectUsers;