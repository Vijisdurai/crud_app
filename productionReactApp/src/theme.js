// FILE: src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009ADD',
      dark: '#005486',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#005486',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262626',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily:
      '"Century Gothic", "Apple Gothic", "Calibri", "Segoe UI", Arial, sans-serif',
    fontSize: 13,
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #005486 0%, #009ADD 100%)',
          boxShadow: '0 2px 8px rgba(0,84,134,0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#005486',
          color: '#FFFFFF',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0,154,221,0.35)',
            '&:hover': { backgroundColor: 'rgba(0,154,221,0.45)' },
          },
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
        contained: {
          boxShadow: '0 2px 6px rgba(0,154,221,0.4)',
          '&:hover': { boxShadow: '0 4px 12px rgba(0,154,221,0.5)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: { boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontSize: 13,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#005486',
            color: '#FFFFFF',
            fontWeight: 700,
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#005486',
            color: '#FFFFFF',
          },
          '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700 },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#F2F2F2',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0,154,221,0.08)',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(0,154,221,0.18) !important',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e0e0e0',
          },
        },
      },
    },
  },
});

export default theme;
