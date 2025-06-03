export const lightTheme = {
    colors: {
        primary: '#36d1dc',
        secondary: '#5b86e5',
        background: 'linear-gradient(135deg, #55efc4, #42b3f5)',
        card: 'rgba(255, 255, 255, 0.15)',
        text: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(255, 255, 255, 0.2)',
        shadow: 'rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
        small: '10px',
        medium: '15px',
        large: '20px',
        round: '50px',
    },
    fontSizes: {
        small: '0.8rem',
        medium: '1rem',
        large: '1.2rem',
        xlarge: '1.5rem',
        xxlarge: '1.8rem',
        huge: '3rem',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    transitions: {
        fast: '0.2s ease',
        default: '0.3s ease',
    },
};

export const darkTheme = {
    colors: {
        primary: '#36d1dc',
        secondary: '#5b86e5',
        background: 'linear-gradient(135deg, #2d3436, #000000)',
        card: 'rgba(30, 30, 30, 0.75)',
        text: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: 'rgba(0, 0, 0, 0.3)',
    },
    borderRadius: lightTheme.borderRadius,
    fontSizes: lightTheme.fontSizes,
    spacing: lightTheme.spacing,
    transitions: lightTheme.transitions,
};
