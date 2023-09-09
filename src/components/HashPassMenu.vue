<template>
    <v-card>
        <slot></slot>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HashPassMenu'
})
</script>