"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileConverterService = void 0;
const path = require('path');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
class FileConverterService {
    converter(fileDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const ext = '.pdf';
            const fileBuffer = Buffer.from(fileDetails, 'base64');
            const outputPath = path.join("/home/exathought/DOcs/NextJsDocs/ConvertedPDF", `BaseSixtyFour${ext}`);
            let pdfBuf = yield libre.convertAsync(fileBuffer, ext, undefined);
            yield fs.writeFile(outputPath, pdfBuf);
            return pdfBuf;
            // Here in done you have pdf file which you can save or transfer in another stream
        });
    }
}
exports.fileConverterService = new FileConverterService();
