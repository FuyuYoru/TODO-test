/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                lightBackground: '#ffffff',
                darkBackground: '#06080C',
                lightText: '#000000',
                darkText: '#FFFFFF',
            },
            fontFamily: {
                'tactic': ['Tactic Sans'],
                'inter': ['Inter'],
              },
        }
    },
    plugins: [],
};

