<!-- App.vue -->
<template>
  <v-app @wheel.hidden
  @touchmove.hidden
  @scroll.hidden class="shadow-lg">
    <TitleBar></TitleBar>
    <v-main>
      <RouterView></RouterView>
    </v-main>
    <BottomNavigation></BottomNavigation>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BottomNavigation from './components/BottomNavigation.vue';
import TitleBar from './components/TitleBar.vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  components: {
    'BottomNavigation': BottomNavigation,
    'RouterView' : RouterView,
    'TitleBar' : TitleBar
  },
});
</script>