<template>
    <v-card class="import-option" :selected="modelValue == value">
        <label :for="value" class="font-bold flex flex-col justify-center items-center cursor-pointer">
            <v-icon>{{ 'mdi-' + icon }}</v-icon>
            <span>{{ label }}</span>
        </label>
        <input class="hidden" :name="modelValue" type="radio" :id="value" :value="modelValue" @input="updateValue">
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'ImportOption',
    methods: {
        updateValue() : void {
            this.$emit('update:modelValue', this.value)
        }
    },
    props: {
        modelValue : {
        type: String as PropType<string>,
            required: true,
        },
        icon : String,
        value : String,
        label: String
    }
})
</script>