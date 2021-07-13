import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import theme from '.././components/Theme.js';
import style from '.././styles/Availability.module.css';

import TimeBlock from './TimeBlock.js';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#f1e4f4',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography component="span" variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

let timeSlotIdx = 0

export default function AvailabilitySelection({
  timeSlots: prevTimeSlots,
  handleClose,
  open,
}) {
  const [ timeSlots, setTimeSlots ] = useState(prevTimeSlots ?? []);

  const handleAddClick = () => {
    setTimeSlots([...timeSlots, {
      id: timeSlotIdx++,
      start: undefined,
      end: undefined,
    }]);
  };

  const handleRemoveClick = (key) => {

    let index = timeSlots.indexOf(index);

    const list = [...timeSlots];
    list.splice(index, 1);
    setTimeSlots(list);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          maxWidth = "xl"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>

          <DialogTitle id="customized-dialog-title" onClose={
            handleClose}>
            Add Availability
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom component="span">
              <TimeBlock handleRemoveClick={handleRemoveClick}/>
            </Typography>
            <Typography gutterBottom component="span">
              {timeSlots.map(({id, start, end}) => (
                <TimeBlock
                  key={id}
                  handleRemoveClick={handleRemoveClick}
                  start={start}
                  end={end}
                />
              ))}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClick} variant="outlined" color="primary">
              Add Block
            </Button>
            <Button autoFocus onClick={handleClose} variant="outlined" color="primary">
             Submit
            </Button>
          </DialogActions>

        </Dialog>
      </ThemeProvider>
    </div>
  );
}
