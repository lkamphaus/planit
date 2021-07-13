import React from 'react';
import Button from '@material-ui/core/Button';
import AvailabilitySelection from '.././components/AvailabilitySelection.jsx';
import { ThemeProvider } from '@material-ui/styles';
import theme from '.././components/Theme.jsx';

export default function Dialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Availability
        </Button>
        <AvailabilitySelection handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}/>
     </ThemeProvider>
    </div>
  );
}


