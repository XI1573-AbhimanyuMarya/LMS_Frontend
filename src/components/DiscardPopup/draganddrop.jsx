import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { useStyles } from './style';
import { DropzoneArea } from 'material-ui-dropzone';
import upload from "../../images/upload.jpg";
import shape from '@material-ui/core/styles/shape';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const DiscardPopup = (props) => {
  const classes = useStyles();
  const learningPathState = useSelector(state => state.learningPathState);
  // const { discardModelOpen } = learningPathState;
  const { discardHandler,changeImgHandler,uploadDocs } = props;
  const { uploadFilePopup } = learningPathState;

  const theme = createMuiTheme({
    overrides: {
      MuiDropzoneArea: {
        text: {
          color: "#000"
        },
        icon: {
          color: "#0073e6",
          backgroundImage:"url(../../images/upload.jpg)"
        },
      }
    }
  });

  /**
   * function to cancel disacrd popup
   */
  const handleClose = () => {
    discardHandler(false);
  };
  /**
   * function to agree discard popup 
   */
  const handleDiscard = () => {
    discardHandler(true);
  }
  const saveHandler=(files)=>{
    console.log(files);
  }

  return (
    <div >
      <Dialog
        maxWidth='xs'
        open={uploadFilePopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ margin: "25px" }}>
        <MuiThemeProvider theme={theme}>
          <DropzoneArea style={{}}
            dropzoneText={"Drag or Browse files here "}
            acceptedFiles={['image/*']}
            filesLimit={10}
            maxFileSize={250000}
            showPreviews={true}
            showPreviewsInDropzone={false}
            useChipsForPreview
            previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
            previewChipProps={{ classes: { root: classes.previewChip } }}
            previewText="Selected files"
            onChange={changeImgHandler}
            showAlerts={false}
          />
          </MuiThemeProvider>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button autoFocus onClick={uploadDocs} color="primary" variant="contained" className={classes.discardButtonpop}>
              Submit
                    </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

DiscardPopup.propTypes = {
  discardHandler: PropTypes.func.isRequired,
};

export default DiscardPopup;
