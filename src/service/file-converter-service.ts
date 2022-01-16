const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);


class FileConverterService{
    async converter(fileDetails:string) {
        const ext:string = '.pdf'
        const fileBuffer:Buffer = Buffer.from(fileDetails, 'base64')
        const outputPath:string = path.join("/home/exathought/DOcs/NextJsDocs/ConvertedPDF",`BaseSixtyFour${ext}`)
        let pdfBuf:Buffer = await libre.convertAsync(fileBuffer, ext, undefined);
        await fs.writeFile(outputPath,pdfBuf)
        return pdfBuf;
        // Here in done you have pdf file which you can save or transfer in another stream
    }
}
export let fileConverterService = new FileConverterService()
