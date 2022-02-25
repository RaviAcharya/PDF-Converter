"use strict";
//const path = require('path');
//const fs = require('fs').promises;
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
exports.fileConverter = void 0;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
//File converter
function fileConverter(documentBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const ext = ".pdf";
        let pdfBuf = yield libre.convertAsync(documentBuffer, ext, undefined);
        return pdfBuf;
    });
}
exports.fileConverter = fileConverter;
