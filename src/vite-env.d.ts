/// <reference types="vite/client" />

declare module 'vue-toastr' {
    import Vue, { PluginObject } from 'vue';
  
    interface VueToastr {
      defaultPosition: string;
      s(message: string, title?: string): void;
      // Add more methods and properties here if necessary
    }
  
    const VueToastr: PluginObject<never>;
  
    export default VueToastr;
  }
  