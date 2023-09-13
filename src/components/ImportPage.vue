<template>
    <HashPassMenu>
        <v-row>
            <v-col cols="12">
                <v-file-input 
                    :label="$t('chooseFile')" variant="solo-filled"
                    bg-color="background"
                    density="compact"
                    v-model="state.selectedFile"
                    :show-size="true"
                ></v-file-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="grid grid-cols-4 gap-10" >
                    <ImportOption v-for="option in importOptions"
                        :label="option.label"
                        :icon="option.icon"
                        :value="option.value"
                        v-model="state.selectedImportIption"
                    ></ImportOption>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3" offset="9">
                <v-btn class="w-full" color="primary" @click="importFile()">{{ $t('btnImport') }}</v-btn>
            </v-col>
        </v-row>
    </HashPassMenu>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import HashPassMenu from './HashPassMenu.vue';
import ImportOption from './ImportOption.vue';
import { BrowserExportOption } from '../../public/ts/browserExportOption'
import { useToast } from "vue-toastification";
import i18n from '../locales/i18n';
import importCsv from '../ts/importCsv'

export default defineComponent({
    name: 'ImportPage',
    setup() {
        const toastr = useToast();        
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
            if(state.selectedFile.length == 0) {
                toastr.warning(i18n.global.t('noFileSelected'))
                return false;
            }

            if(state.selectedImportIption == BrowserExportOption.NONE){
                toastr.warning(i18n.global.t('noBrowserSelected'))
                return false;
            }
            return true;
        }

        const importFile = () => {
            if(validateImport()){
                const selectedFile = state.selectedFile[0] as File
                importCsv(selectedFile);
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