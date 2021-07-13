import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#834187',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f4e3f5',
    },
  },
});

theme.props = {
  MuiTextField: {
    size: 'medium',
  },
  MuiButton: {
    color: 'primary',
  }
}

theme.overrides = {
  MuiCardMedia: {
    root: {
      height: '150px',
      postion: 'absolute',
    }
  },
}

export default theme;
