<template>
  <Menu>
    <v-img class="main-logo"
      :src="$vuetify.theme.global.current.dark ? '/src/assets/logo-dark.png' : '/src/assets/logo-light.png'"
      apect-ratio="16/9"
      contain
    ></v-img>
  </Menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HashPassMenu from './HashPassMenu.vue';

export default defineComponent({
    name: 'MainMenu',
    components: {
    Menu: HashPassMenu,
}
})
</script>