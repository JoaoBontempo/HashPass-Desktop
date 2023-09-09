import { createI18n } from "vue-i18n"
import enUS from './en-US.json';
import ptBR from './pt-BR.json';


const i18n = createI18n({
    legacy: false,
    locale: 'en-US', 
    messages: {
        'en-US' : enUS,
        'pt-BR' : ptBR
    }
})
  
export default i18n;