export const lightTheme = {
    body: 'linear-gradient(135deg, #85C1E9 0%, #5DADE2 100%)',
    text: '#2C3E50',
    card: 'rgba(255, 255, 255, 0.2)',
    cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    blueText: '#1976d2',
    blueTextHovered: '#0d47a1',
    border: '#E0E0E0',
    dataPointIconBackground: '#F3F3F3',
    cardBackground: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(220, 240, 255, 0.75))',
    dropdownBackground: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(220, 240, 255, 0.9))',
};

export const darkTheme = {
    body: 'linear-gradient(135deg, #1A2530 0%, #2C3E50 100%)',
    text: '#ECF0F1',
    card: '#37516a',
    cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    blueText: '#0047AB',
    blueTextHovered: '#0437F2',
    border: '#4A5568',
    dataPointIconBackground: '#28445f',
    cardBackground: 'linear-gradient(to bottom, rgba(200, 210, 225, 0.85), rgba(170, 180, 195, 0.75))',
    dropdownBackground: 'linear-gradient(to bottom, rgba(200, 210, 225, 1), rgba(170, 180, 195, 0.9))',
};

export type ThemeType = typeof lightTheme;
