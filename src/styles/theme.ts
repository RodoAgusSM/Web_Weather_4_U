export const lightTheme = {
    body: 'linear-gradient(135deg, #85C1E9 0%, #5DADE2 100%)',
    text: '#2C3E50',
    card: '#FFFFFF',
    cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    accent: '#3498DB',
    border: '#E0E0E0'
};

export const darkTheme = {
    body: 'linear-gradient(135deg, #1A2530 0%, #2C3E50 100%)',
    text: '#ECF0F1',
    card: '#34495E',
    cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    accent: '#3498DB',
    border: '#4A5568'
};

export type ThemeType = typeof lightTheme;
