import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from "vuetify/iconsets/fa";
import { mdi, aliases } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"; 
import "@fortawesome/fontawesome-free/css/all.css";
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import './index.css';
import { darkTheme, lightTheme } from './theme/theme'
import i18n from './locales/i18n'
import { useI18n } from 'vue-i18n'
import { AppThemes } from '../public/ts/theme'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const vuetify = createVuetify({
  locale:{
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  theme: {
    defaultTheme: AppThemes.DARK,
    themes: {
      darkTheme, lightTheme
    }
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,
})

createApp(App)
    .use(vuetify)
    .use(router)
    .use(i18n)
    .use(Toast)
    .mount('#app')
    .$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
