<template>
    <v-bottom-navigation bg-color="primary" v-model="activeTab" app>
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
                    tab: 'another',
                    text: 'Another',
                    icon: 'mdi-account',
                    route: '/another',
                    exact: false,
                },
                // Add more tabs as needed
            ],
        };
    },
};
</script>
  