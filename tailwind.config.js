/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        bg_bug: '#8BD674',
        bg_dark: '#6F6E78',
        bg_dragon: '#7383B9',
        bg_electric: '#F2CB55',
        bg_fairy: '#EBA8C3',
        bg_fighting: '#EB4971',
        bg_fire: '#FFA756',
        bg_flying: '#83A2E3',
        bg_ghost: '#8571BE',
        bg_grass: '#8BBE8A',
        bg_ground: '#F78551',
        bg_ice: '#91D8DF',
        bg_normal: '#B5B9C4',
        bg_poison: '#9F6E97',
        bg_psychic: '#FF6568',
        bg_rock: '#D4C294',
        bg_steel: '#4C91B2',
        bg_water: '#58ABF6',
        idPoke: '#17171B',

        
      },
      fontSize:{
        pokeName: '26px ',
        pokeType: '12px'
      }

    },
  },
  plugins: [],
}

