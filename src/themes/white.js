import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import React, { useState, useContext } from 'react';

// Create a theme instance.

const colors = {
  light: {
    primary: {
      main: '#fff',
    },
    background: {
      default: '#fff',
    }
  },
  dark: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#5e5e5e',
    },
    background: {
      default: '#333333',
    }
  },
  red: {
    primary: {
      main: '#c92d39',
    },
    background: {
      default: '#fbd8e2',
    }
  },
  orange: {
    primary: {
      main: '#ef8d22',
    },
    background: {
      default: '#faebd7',
    }
  },
  yellow: {
    primary: {
      main: '#e5b53b',
    },
    background: {
      default: '#fff6d6',
    }
  },
  green: {
    primary: {
      main: '#488a12',
    },
    background: {
      default: '#e2fbcd',
    }
  },
  blue: {
    primary: {
      main: '#4262c2',
    },
    background: {
      default: '#d9effb',
    }
  },
  violet: {
    primary: {
      main: '#834187',
    },
    background: {
      default: '#f4e3f5',
    }
  }
}

const ThemeProvider = () => {
  const [color, setColor] = useState(colors.violet);

  const theme = createTheme({
    spacing: 8,
    palette: {
      ...color,
      error: {
        main: red.A400,
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



}



export default theme;
