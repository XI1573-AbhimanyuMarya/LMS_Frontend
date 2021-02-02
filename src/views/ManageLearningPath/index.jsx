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

const ManageLearningPath = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [selectedCardsCount, setSelectedCardsCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const adminManagePathDetails = useSelector((state) => state.learningPathState);
  
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

  const renderWelcome = (
    <Container
      component="main"
      className={classes.mainContainer}>
      <div className={classes.headerContainer}>
        <h2 style={{width: '100%'}}>All Learning Paths</h2>
        <button className={classes.deleteButton} onClick={deleteCard} disabled={selectedCardsCount < 1}>
          Delete selected 
          <span className={classes.deleteIcon}>{selectedCardsCount}</span>
        </button>
      </div>
      <div className={classes.cardContainer}>
      {adminManagePathDetails.isLoading ? 
      <CircularProgress className={classes.loader} /> : 
      adminManagePathDetails && adminManagePathDetails.adminLearningPathManageDetails?.map((item) => (
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