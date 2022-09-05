module.exports = {
  purge: [
    './src/**/*[],{jsx,js,tsx,ts}',
    "./public/index.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'plus-rounded': ['"M PLUS Rounded 1c"', 'sans-serif']
      }
    },
    color:{
    }
  },
  variants: {
    extend: {
      opacity:['disabled']
    },
  },
  plugins: [
    require('daisyui')
  ],
  
  //config daisyui
  daisyui: {
    themes:false,
  }
}
