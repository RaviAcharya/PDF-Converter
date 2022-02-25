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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileConverterService = void 0;
const api_directory_1 = require("../rest/api-directory");
const axios_1 = __importDefault(require("axios"));
const file_converter_1 = require("./file-converter");
class FileConverterService {
    //file Conversion service
    fileConverterService(fileDetails, fileType, targetType, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileBuffer = Buffer.from(fileDetails, 'base64');
                const pdfBuffer = yield (0, file_converter_1.fileConverter)(fileBuffer);
                const pdfArrayBuffer = pdfBuffer.toJSON();
                return pdfArrayBuffer;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //file conversion of a document based on documentId
    fileConvertByIdService(headerObject, docId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = {
                    'authorization': headerObject.authorization,
                    'id': headerObject.id
                };
                //getting the document details (documentImageKey, name, type, typeId, size)
                const documentData = yield getDocumentDetails(headers, docId);
                //use this objects to get the document buffer
                const queryParams = {
                    documentImageKey: documentData.documentImageKey,
                    type: documentData.type,
                    typeId: documentData.typeId
                };
                //get the buffer data by passing 'queryParams'  in this function
                const bufferData = yield getDocumentBuffer(headers, queryParams);
                //convert the document to pdf 
                const pdfBuffer = yield (0, file_converter_1.fileConverter)(bufferData);
                // get the 'pdfBuffer' data in json format 
                let jsn = pdfBuffer.toJSON();
                const documentDetails = {
                    documentBuffer: jsn,
                    documentName: documentData.documentInformation.fileName,
                    documentType: documentData.documentInformation.fileType,
                    documentSize: documentData.documentInformation.fileSize
                };
                return documentDetails;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
//this gets the buffer-format of a document
function getDocumentBuffer(headers, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get the base url
            const url = (0, api_directory_1.getImageBufferFromZixaServerUrl)();
            const newUrl = `${url}?imageId=${queryParams.documentImageKey}&type=${queryParams.type}&typeId=${queryParams.typeId}`;
            //use previous 'newUrl' url to get the document-buffer using axios
            let documentResponse = yield axios_1.default.get(newUrl, { headers: headers });
            const documentData = documentResponse.data.Body.data;
            const bufferData = Buffer.from(documentData);
            return bufferData;
        }
        catch (error) {
            throw error;
        }
    });
}
//this function gets document-details
function getDocumentDetails(headers, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get the base url
            const url = (0, api_directory_1.getDocNameDetailsFromZixaServerUrl)();
            const newUrl = `${url}/${params}`;
            //use previous 'newUrl' url to get the document-details using axios
            let documentResponse = yield axios_1.default.get(newUrl, { headers: headers });
            const queryParams = {
                documentImageKey: documentResponse.data[0].documentImageKey,
                type: documentResponse.data[0].type,
                typeId: documentResponse.data[0].typeId,
                documentInformation: documentResponse.data[0].documentInformation
            };
            return queryParams;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.fileConverterService = new FileConverterService();
