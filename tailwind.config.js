/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,js,pug}'],
  theme: {
    extend: {
      maxHeight: {
        695: '695px'
      },
      fontFamily: {
        'FuturaLTW01-LightOblique': 'FuturaLTW01-LightOblique',
        Blinking: 'Blinking'
      },
      colors: {
        'color-primary': '#BCDFE1',
        'color-segundary': '#eef3f7'

      }
    }
  },
  plugins: []
}
