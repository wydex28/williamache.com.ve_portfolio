tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                dracula: {
                    bg: '#282a36',
                    card: '#44475a',
                    fg: '#f8f8f2',
                    comment: '#6272a4',
                    cyan: '#8be9fd',
                    green: '#50fa7b',
                    orange: '#ffb86c',
                    pink: '#ff79c6',
                    purple: '#bd93f9',
                    red: '#ff5555',
                    yellow: '#f1fa8c'
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}
