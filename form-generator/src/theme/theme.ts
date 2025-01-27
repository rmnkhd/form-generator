import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '3rem',
            color: '#333',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#444',
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
            color: '#555',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#333',
        },
        body1: {
            fontSize: '1rem',
            color: '#666',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            color: '#777',
            lineHeight: 1.4,
        },
        button: {
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '1rem',
        },
        caption: {
            fontSize: '0.75rem',
            color: '#888',
        },
        overline: {
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: '#333',
        },
    },
    palette: {
        primary: {
            main: '#00796b', // Teal
        },
        secondary: {
            main: '#ff5722', // Deep Orange
        },
        error: {
            main: '#f44336', // Red
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 16px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                    },
                },
                contained: {
                    backgroundColor: '#00796b',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#004d40',
                    },
                },
                text: {
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: '#ddd',
                        },
                        '&:hover fieldset': {
                            borderColor: '#00796b',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#00796b',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                        color: '#00796b',
                        fontWeight: 500,
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: '#ff5722', // Deep Orange
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: '1rem',
                    color: '#333',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    lineHeight: 1.6,
                },
            },
        },
    },
});

export default theme;
