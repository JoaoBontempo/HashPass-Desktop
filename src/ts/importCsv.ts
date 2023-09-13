import { useToast } from "vue-toastification";
import Papa from 'papaparse';
import { BrowserPasswordFile } from "../../public/ts/browserExportOption";


const toastr = useToast()

export default function importCSV(csv: File): void {
    Papa.parse(csv, {
        header: true,
        complete: (result) => {
            const rows = result.data || [];
            const browserFile = rows
                .map(row => row as BrowserPasswordFile)
                .map(row => new BrowserPasswordFile(row.name ?? '', row.password ?? '', row.username ?? ''))

            //@ts-expect-error
            api.importBrowserFile(browserFile)
            
        },
        error: (error) => {
            toastr.error('CSV parsing error:' + error.message)
        },
    })

}