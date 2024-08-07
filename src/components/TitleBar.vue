<template>
    <v-system-bar class="dragable p-4 rounded-t-lg" color="primary">
        <div>
            <v-btn @click="toggleTheme" :icon="$vuetify.theme.current.dark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'" variant="text"></v-btn>
            <select @change="changeLanguage" v-model="state.selectedLanguage">
                <option v-for="option in state.languageOptions" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <v-spacer></v-spacer>
        <span class="text-base font-bold">{{ $t(`${$route.name?.toString()}`) }}</span>
        <v-spacer></v-spacer>
        <div>
            <v-btn @click="minimize" icon="mdi-minus" variant="text"></v-btn>
            <v-btn @click="close" icon="mdi-close" variant="text" class="ms-2"></v-btn>
        </div>
    </v-system-bar>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useTheme } from 'vuetify'
import { useLocale } from 'vuetify';
import { AppLanguages } from '../locales/languages'
import { Themes } from '../theme/theme'

export default defineComponent({
    name: 'TitleBar',
    setup() {
        const state = reactive({
            selectedLanguage : 'en-US',
            languageOptions : [
                {
                    text: 'English',
                    value: AppLanguages.ENGLLISH
                },
                {
                    text: 'Português',
                    value: AppLanguages.PORTUGUESE
                },
            ]
        })

        const theme = useTheme()
        const locale = useLocale()

        //@ts-expect-error
        const close = api.close
        //@ts-expect-error
        const minimize = api.minimize

        const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? Themes.LIGHT : Themes.DARK

        const changeLanguage = () => locale.current.value = state.selectedLanguage

        return {
            state,
            close, 
            minimize, 
            toggleTheme,
            changeLanguage
        }
    }
})
</script>