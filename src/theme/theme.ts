export const theme = {
    colors: {
        background: '#FFFFFF',
        text: '#000000',
        textSecondary: '#666666',
        primary: '#007AFF',
        secondary: '#5856D6',
        error: '#FF3B30',
        border: '#C7C7CC',
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    textVariants: {
        header: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        subhead: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        body: {
            fontSize: 16,
        },
        caption: {
            fontSize: 14,
        },
    },
} as const;

export type Theme = typeof theme;
