import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../store/actions";
import Container from "@material-ui/core/Container";
import { useStyles } from "./style";
import WithLoading from "../../hoc/WithLoading";
import TopNav from "../../components/TopNav";
import Copyright from "../../components/Copyright";
import CircularProgress from '@material-ui/core/CircularProgress';
import ManageCard from "./ManageCard";
import { LEARNING_PATH_LABELS } from "../../modules/constants";
import TextField from "@material-ui/core/TextField";

const ManageLearningPath = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [selectedCardsCount, setSelectedCardsCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const adminManagePathDetails = useSelector((state) => state.learningPathState);
  const {
    filteredLearningPath,
  } = adminManagePathDetails;
  
  useEffect(() => {
    dispatch(Actions.learningPathActions.getAdminManagePathDetails());
  }, []);

  const selectedCard = (item) => {
    if(!selectedItems[item.learningPathId]) {
      setSelectedCardsCount(++selectedCardsCount);
      setSelectedItems(prevItems => {
        return {
          ...prevItems,
          [item.learningPathId]: item.learningPathId
        }
      });
      return;
    }
    delete selectedItems[item.learningPathId];
    setSelectedCardsCount(--selectedCardsCount);
  }

  const deleteCard = () => {
    const items = [];
    for(let item in selectedItems) {
      items.push(selectedItems[item]);
    }
    dispatch(Actions.learningPathActions.deleteAdminManagePathCards(items));
    dispatch(Actions.learningPathActions.getAdminManagePathDetails());
    setSelectedCardsCount(0);
    window.location.reload();
  }

  let filterLearningPath = [];
  const changeHandlerLearning = (e) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase();
    if (adminManagePathDetails.adminLearningPathManageDetails?.length > 0) {
      filterLearningPath = adminManagePathDetails.adminLearningPathManageDetails.filter(function (el) {
        return (
          el.name.toLowerCase().includes(searchValue) ||
          el.description.toLowerCase().includes(searchValue) 
        );
      });
      dispatch(Actions.learningPathActions.getFilteredLearningPath(filterLearningPath));
    }
  };

  const LearningPathList = filteredLearningPath
    ? filteredLearningPath?.length > 0
      ? filteredLearningPath
      : ""
    : adminManagePathDetails.adminLearningPathManageDetails;

  const renderWelcome = (
    <Container
      component="main"
      className={classes.mainContainer} style={{minWidth:"168vh"}}>
      <div className={classes.headerContainer}>
        <h2 className={classes.learningPathHeading}>All Learning Paths</h2>
        <button className={classes.deleteButton} onClick={deleteCard} disabled={selectedCardsCount < 1}>
          Delete selected 
          <span className={classes.deleteIcon}>{selectedCardsCount}</span>
        </button>
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <TextField
          id="standard-search"
          label={LEARNING_PATH_LABELS.SEARCH_LEARNING_PATH}
          type="search"
          variant="outlined"
          className={classes.searchField}
          name="searchName"
          size="small"
          onChange={changeHandlerLearning}
        />
        </div>
      <div className={classes.cardContainer}>
      {adminManagePathDetails.isLoading ? 
      <CircularProgress className={classes.loader} /> : 
      LearningPathList && LearningPathList?.map((item) => (
          <div key={item.id} onClick={() => selectedCard(item)}>
            <ManageCard key={item.id} cardDetails={item}/>
          </div>
        ))}
      </div>
    </Container>
  );

  return (
    <div>
      <TopNav></TopNav>
      <main className="main-content">
        {renderWelcome}
      </main>
      <div className="copyright">
        <Copyright />
      </div>
    </div>
  );
};

export default WithLoading(ManageLearningPath);