import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

const EnderecosTheme = {
  dark: false,
  colors: {
    background: '#FF0000',
    surface: '#FFFFFF',
    primary: '#ffff00',
    'primary-darken-1': '#3700B3',
    secondary: '#000000',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}


export default createVuetify({
  theme: {
    defaultTheme: 'EnderecosTheme',
    themes: {
      EnderecosTheme,
    },
  },
})



