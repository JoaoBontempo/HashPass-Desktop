<template>
    <section class="default-menu">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HashPassMenu'
})
</script>