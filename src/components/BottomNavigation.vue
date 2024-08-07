<template>
    <v-bottom-navigation bg-color="primary" class="rounded-b-lg" v-model="activeTab" app>
        <v-btn v-for="(item, index) in items" :key="index" @click="activeTab = item.tab" :to="item.route"
            :exact="item.exact" :active="activeTab === item.tab">
            {{ item.text }}
            <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>
  
<script lang="ts">
export default {
    data() {
        return {
            activeTab: 'home',
            items: [
                {
                    tab: 'home',
                    text: 'Home',
                    icon: 'mdi-home',
                    route: '/',
                    exact: true,
                },
                {
                    tab: '',
                    text: 'Import',
                    icon: 'mdi-import',
                    route: 'import',
                    exact: false,
                },
        
            ],
        };
    },
};
</script>
  