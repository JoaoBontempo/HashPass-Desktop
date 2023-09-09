<!-- App.vue -->
<template>
  <v-app background-color="background">
    <v-main>
      <RouterView></RouterView>
    </v-main>
    <BottomNavigation></BottomNavigation>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BottomNavigation from './components/BottomNavigation.vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  components: {
    'BottomNavigation': BottomNavigation,
    'RouterView' : RouterView,
  },
});
</script>