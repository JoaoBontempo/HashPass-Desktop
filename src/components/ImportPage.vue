<template>
    <HashPassMenu>
        <v-file-input 
            :label="$t('chooseFile')" variant="solo-filled"
            bg-color="background"
            density="compact"
            v-model="state.selectedFile"
            :show-size="true"
        ></v-file-input>
        <div class="grid grid-cols-4 gap-10" >
            <ImportOption v-for="option in importOptions"
                :label="option.label"
                :icon="option.icon"
                :value="option.value"
                v-model="state.selectedImportIption"
            ></ImportOption>
        </div>
        <v-btn @click="importFile()">{{ $t('btnImport') }}</v-btn>
    </HashPassMenu>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import HashPassMenu from './HashPassMenu.vue';
import ImportOption from './ImportOption.vue';
import { BrowserExportOption } from '../../public/ts/browserExportOption'

export default defineComponent({
    name: 'ImportPage',
    setup() {
        const state = reactive({
            selectedImportIption: BrowserExportOption.NONE,
            selectedFile: []
        })

        const importOptions = [
            {
                icon : 'google-chrome',
                value : BrowserExportOption.CHROME,
                label: 'Chrome'
            },
            {
                icon : 'apple-safari',
                value : BrowserExportOption.SAFARI,
                label: 'Safari'
            },
            {
                icon : 'microsoft-edge',
                value : BrowserExportOption.EDGE,
                label: 'Edge'
            },
            {
                icon : 'firefox',
                value : BrowserExportOption.FIREFOX,
                label: 'Firefox'
            },
        ]
        

        const validateImport = function() : boolean {
            return true;
        }

        const importFile = () => {
            if(validateImport()){
                
            }
        }

        return {
            state, importFile, importOptions
        }
    },
    components: {
        HashPassMenu : HashPassMenu,
        ImportOption : ImportOption
    }
});
</script>