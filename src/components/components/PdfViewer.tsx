import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import '@react-pdf-viewer/scroll-mode/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import toast from 'react-hot-toast';


export const PdfViewer = (props: {
    pdfUrl: any
}) => {

    const pdfUrl: string = `https://invoiceprocessingapi.azurewebsites.net/ProcessedInvoices/Invoice_${props.pdfUrl}.pdf`
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    const scrollModePluginInstance = scrollModePlugin()
    const zoomPluginInstance = zoomPlugin();

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js">

            <div
                style={{
                    height: '100vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >

                <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance, scrollModePluginInstance, zoomPluginInstance]} />

            </div>
        </Worker>
    )

}