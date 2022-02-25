//const path = require('path');
//const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

//File converter
export async function fileConverter(documentBuffer:Buffer){
    const ext:string =".pdf"
    let pdfBuf:Buffer = await libre.convertAsync(documentBuffer, ext, undefined);
    return pdfBuf;
}