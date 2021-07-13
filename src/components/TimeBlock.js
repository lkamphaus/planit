import 'date-fns';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DateTime } from "luxon";
import style from '.././styles/Availability.module.css';

const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[200],
  },
});

export default function TimeBlock(props) {
  const [startDate, setStartDate] = useState(startDate || new Date());
  const [endDate, setEndDate] = useState(endDate || new Date());
  const [startTime, setStartTime] = useState(startTime || new Date());
  const [endTime, setEndTime] = useState(endTime || new Date());
  console.log('sd', startDate);
  console.log('stt', startTime)
  console.log('end', endDate);
  console.log('endt', endTime);

  const handleStartDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const handleEndDateChange = (endDate) => {
    setEndDate(endDate);
  };

  const handleStartTimeChange = (startTime) => {
    setStartTime(startTime);
  };

  const handleEndTimeChange = (endTime) => {
    setEndTime(endTime);
  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={style.timeBlock}>
        <KeyboardDatePicker
          className={style.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          className={style.datePicker}
          margin="normal"
          id="time-picker"
          label="Start Time"
          value={startTime}
          onChange={handleStartTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />

         <KeyboardDatePicker
          className={style.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          className={style.datePicker}
          margin="normal"
          id="time-picker"
          label="End Time"
          value={endTime}
          onChange={handleEndTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
         <IconButton aria-label="close"
            className={styles.closeButton}
            onClick={() => {
              props.handleRemoveClick(props.key)}
            }
          >
            <CloseIcon/>
         </IconButton>

      </div>
    </MuiPickersUtilsProvider>
  );
}
