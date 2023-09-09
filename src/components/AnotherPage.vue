<template>
    <v-text-field
        label="Send message to server"
        v-model="state.wsMessage"
    ></v-text-field>
    
    <v-btn @click="test()">{{ $t('click') }}</v-btn>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useTheme } from 'vuetify'


export default defineComponent({
    
    name: 'AnotherPage',
    setup() {
        const theme = useTheme()

        const state = reactive({
            wsMessage : ''
        })
        
        const test = () => {
            theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
            //@ts-expect-error
            api.sendMessage(state.wsMessage)
        }

        return {
            state, test
        }
    },
});


</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
