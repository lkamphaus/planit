import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Options from './Options.js'
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SetTimeForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //const test = mockData.SingleEventData[1];

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <>
      <Button variant="contained" color="primary" component="span" onClick={handleOpen}>
          Set Event Time
        </Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper} id='test33'>
            test
            <Options />
          </div>
      </Modal>
    </>
  )
}

export default SetTimeForm;